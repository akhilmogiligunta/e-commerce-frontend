import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiZap,
} from "react-icons/fi";
import toast from "react-hot-toast";
import BackButton from "../components/BackButton";
import Breadcrumb from "../components/Breadcrumb";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import Rating from "../components/Rating";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import { getProductById } from "../services/api";
import {
  formatCurrency,
  getDiscountedPrice,
  getProductImage,
  getStockStatus,
  slugToTitle,
} from "../utils/formatters";

const RECENT_KEY = "General_recently_viewed";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { products, isWishlisted, toggleWishlist } = useProducts();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductById(id);
        setProduct(productData);
        setSelectedImage(getProductImage(productData));
        setError("");
      } catch (fetchError) {
        setError("We could not find this product.");
        toast.error("Product details are unavailable.");
        console.error(fetchError);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (!product?.id) return;

    try {
      const recentIds = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      const nextIds = [
        product.id,
        ...recentIds.filter((recentId) => recentId !== product.id),
      ].slice(0, 8);
      localStorage.setItem(RECENT_KEY, JSON.stringify(nextIds));
    } catch {
      // Recent viewing history is a progressive enhancement.
    }
  }, [product]);

  const relatedProducts = useMemo(
    () =>
      products
        .filter(
          (candidate) =>
            candidate.category === product?.category && candidate.id !== product?.id,
        )
        .slice(0, 4),
    [products, product],
  );

  if (loading) return <Loader type="page" />;

  if (error || !product) {
    return (
      <main>
        <Breadcrumb items={[{ label: "Shop", to: "/products" }, { label: "Product" }]} />
        <section className="section-shell py-16">
          <BackButton />
          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <h1 className="text-2xl font-extrabold">Product not found</h1>
            <p className="mt-3 text-slate-500 dark:text-zinc-400">{error}</p>
            <Link to="/products" className="btn-primary mt-6">
              Back to Shop
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const discountedPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage,
  );
  const stockStatus = getStockStatus(product.stock);
  const images = [getProductImage(product), ...(product.images || [])].filter(
    (image, index, allImages) => image && allImages.indexOf(image) === index,
  );
  const liked = isWishlisted(product.id);

  const handleAddToCart = () => addItem(product, quantity);

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate("/checkout");
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Breadcrumb
        items={[
          { label: "Shop", to: "/products" },
          { label: slugToTitle(product.category), to: "/products" },
          { label: product.title },
        ]}
      />

      <section className="section-shell py-8">
        <BackButton />
        <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.95fr]">
          <div className="space-y-4">
            <div className="card flex aspect-square items-center justify-center overflow-hidden bg-white p-8 dark:bg-zinc-900">
              <img
                src={selectedImage}
                alt={product.title}
                className="h-full w-full object-contain"
                loading="eager"
              />
            </div>
            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6">
              {images.slice(0, 6).map((image) => (
                <button
                  type="button"
                  key={image}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square rounded-lg border bg-white p-2 transition dark:bg-zinc-900 ${selectedImage === image
                      ? "border-brand-600 ring-2 ring-brand-500/25"
                      : "border-slate-200 dark:border-zinc-800"
                    }`}
                >
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
              {product.brand || slugToTitle(product.category)}
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-slate-950 sm:text-4xl dark:text-white">
              {product.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Rating value={product.rating || 0} count={product.reviews?.length} />
              <span
                className={`rounded-lg px-3 py-1 text-sm font-bold ${stockStatus.tone === "success"
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-200"
                    : "bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-200"
                  }`}
              >
                {stockStatus.label}
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-end gap-3">
              <p className="text-4xl font-black text-slate-950 dark:text-white">
                {formatCurrency(discountedPrice)}
              </p>
              <p className="pb-1 text-lg font-semibold text-slate-400 line-through">
                {formatCurrency(product.price)}
              </p>
              <span className="mb-1 rounded-md bg-accent-500 px-2.5 py-1 text-xs font-bold text-white">
                {Math.round(product.discountPercentage)}% OFF
              </span>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 dark:text-zinc-300">
              {product.description}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center overflow-hidden rounded-lg border border-slate-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setQuantity((current) => Math.max(current - 1, 1))}
                  className="inline-flex h-12 w-12 items-center justify-center hover:bg-slate-100 dark:hover:bg-zinc-800"
                  aria-label="Decrease quantity"
                >
                  <FiMinus />
                </button>
                <span className="inline-flex h-12 min-w-14 items-center justify-center border-x border-slate-200 px-4 font-extrabold dark:border-zinc-800">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((current) =>
                      Math.min(current + 1, product.stock || 99),
                    )
                  }
                  className="inline-flex h-12 w-12 items-center justify-center hover:bg-slate-100 dark:hover:bg-zinc-800"
                  aria-label="Increase quantity"
                >
                  <FiPlus />
                </button>
              </div>
              <button type="button" onClick={handleAddToCart} className="btn-primary">
                <FiShoppingBag />
                Add to Cart
              </button>
              <button type="button" onClick={handleBuyNow} className="btn-secondary">
                <FiZap />
                Buy Now
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                className={`inline-flex h-12 w-12 items-center justify-center rounded-lg border transition ${liked
                    ? "border-rose-200 bg-rose-50 text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10"
                    : "border-slate-200 text-slate-700 dark:border-zinc-800 dark:text-zinc-100"
                  }`}
                aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
              >
                <FiHeart fill={liked ? "currentColor" : "none"} />
              </button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Delivery", product.shippingInformation || "Fast tracked shipping"],
                ["Warranty", product.warrantyInformation || "Standard warranty"],
                ["Returns", product.returnPolicy || "Easy returns"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-lg border border-slate-200 p-4 dark:border-zinc-800"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-10">
        <h2 className="mb-5 text-2xl font-extrabold">Product Reviews</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {(product.reviews || []).slice(0, 3).map((review) => (
            <article key={`${review.reviewerName}-${review.date}`} className="card p-5">
              <Rating value={review.rating || 0} compact />
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-zinc-300">
                "{review.comment}"
              </p>
              <p className="mt-4 text-sm font-extrabold">
                {review.reviewerName || "Verified buyer"}
              </p>
            </article>
          ))}
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="section-shell py-10">
          <h2 className="mb-5 text-2xl font-extrabold">Related Products</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}
    </motion.main>
  );
};

export default ProductDetails;
