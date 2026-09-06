import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { getCategories, getProducts } from "../services/api";
import { useDebounce } from "../hooks/useDebounce";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { slugToTitle, sortProducts } from "../utils/formatters";

const ProductContext = createContext(null);

const ALL_CATEGORIES = { slug: "all", name: "All Products" };

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([ALL_CATEGORIES]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceLimit, setPriceLimit] = useState(2000);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useLocalStorage("General_wishlist", []);

  const debouncedSearchTerm = useDebounce(searchTerm.trim().toLowerCase(), 300);

  const fetchStorefrontData = useCallback(async () => {
    try {
      setLoading(true);
      const [productData, categoryData] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      const highestPrice = Math.ceil(
        Math.max(...productData.map((product) => product.price), 1000),
      );

      const mergedCategories = new Map(
        categoryData.map((category) => [category.slug, category]),
      );

      productData.forEach((product) => {
        if (!mergedCategories.has(product.category)) {
          mergedCategories.set(product.category, {
            slug: product.category,
            name: slugToTitle(product.category),
          });
        }
      });

      setProducts(productData);
      setCategories([ALL_CATEGORIES, ...mergedCategories.values()]);
      setMaxPrice(highestPrice);
      setPriceLimit(highestPrice);
      setError("");
    } catch (fetchError) {
      setError("We could not load products right now.");
      toast.error("Product API is unavailable. Please try again soon.");
      console.error(fetchError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStorefrontData();
  }, [fetchStorefrontData]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        !debouncedSearchTerm ||
        product.title.toLowerCase().includes(debouncedSearchTerm) ||
        product.description.toLowerCase().includes(debouncedSearchTerm) ||
        product.category.toLowerCase().includes(debouncedSearchTerm) ||
        product.brand?.toLowerCase().includes(debouncedSearchTerm);

      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesPrice = product.price <= priceLimit;
      const matchesRating = product.rating >= minRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    return sortProducts(filtered, sortBy);
  }, [
    products,
    debouncedSearchTerm,
    selectedCategory,
    priceLimit,
    minRating,
    sortBy,
  ]);

  const featuredProducts = useMemo(
    () =>
      sortProducts(
        products.filter((product) => product.rating >= 4.5),
        "featured",
      ).slice(0, 8),
    [products],
  );

  const bestSellers = useMemo(
    () => sortProducts(products, "rating").slice(0, 8),
    [products],
  );

  const flashSaleProducts = useMemo(
    () => sortProducts(products, "discount").slice(0, 8),
    [products],
  );

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((currentWishlist) => {
        const exists = currentWishlist.includes(productId);
        const nextWishlist = exists
          ? currentWishlist.filter((id) => id !== productId)
          : [...currentWishlist, productId];

        toast.success(exists ? "Removed from wishlist" : "Added to wishlist");
        return nextWishlist;
      });
    },
    [setWishlist],
  );

  const resetFilters = useCallback(() => {
    setSearchTerm("");
    setSelectedCategory("all");
    setPriceLimit(maxPrice);
    setMinRating(0);
    setSortBy("featured");
  }, [maxPrice]);

  const value = useMemo(
    () => ({
      products,
      categories,
      loading,
      error,
      searchTerm,
      selectedCategory,
      priceLimit,
      maxPrice,
      minRating,
      sortBy,
      wishlist,
      filteredProducts,
      featuredProducts,
      bestSellers,
      flashSaleProducts,
      setSearchTerm,
      setSelectedCategory,
      setPriceLimit,
      setMinRating,
      setSortBy,
      resetFilters,
      toggleWishlist,
      isWishlisted: (productId) => wishlist.includes(productId),
      refetchProducts: fetchStorefrontData,
    }),
    [
      products,
      categories,
      loading,
      error,
      searchTerm,
      selectedCategory,
      priceLimit,
      maxPrice,
      minRating,
      sortBy,
      wishlist,
      filteredProducts,
      featuredProducts,
      bestSellers,
      flashSaleProducts,
      resetFilters,
      toggleWishlist,
      fetchStorefrontData,
    ],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }

  return context;
};
