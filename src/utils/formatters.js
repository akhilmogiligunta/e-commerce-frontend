export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const formatCurrency = (value = 0) => currencyFormatter.format(value);

export const getDiscountedPrice = (price = 0, discountPercentage = 0) =>
  Number((price - price * (discountPercentage / 100)).toFixed(2));

export const slugToTitle = (slug = "") =>
  slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const getProductImage = (product) =>
  product?.thumbnail || product?.images?.[0] || "/empty-cart.svg";

export const getStockStatus = (stock = 0) => {
  if (stock <= 0) return { label: "Out of stock", tone: "danger" };
  if (stock < 10) return { label: "Limited stock", tone: "warning" };
  return { label: "In stock", tone: "success" };
};

export const sortProducts = (products, sortBy) => {
  const sorted = [...products];

  switch (sortBy) {
    case "price-low":
      return sorted.sort(
        (a, b) =>
          getDiscountedPrice(a.price, a.discountPercentage) -
          getDiscountedPrice(b.price, b.discountPercentage),
      );
    case "price-high":
      return sorted.sort(
        (a, b) =>
          getDiscountedPrice(b.price, b.discountPercentage) -
          getDiscountedPrice(a.price, a.discountPercentage),
      );
    case "rating":
      return sorted.sort((a, b) => b.rating - a.rating);
    case "name":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "discount":
      return sorted.sort(
        (a, b) => b.discountPercentage - a.discountPercentage,
      );
    default:
      return sorted.sort(
        (a, b) =>
          b.rating +
          b.discountPercentage / 10 -
          (a.rating + a.discountPercentage / 10),
      );
  }
};

export const compactProduct = (product) => ({
  id: product.id,
  title: product.title,
  price: product.price,
  discountPercentage: product.discountPercentage || 0,
  rating: product.rating || 0,
  stock: product.stock || 0,
  brand: product.brand,
  category: product.category,
  thumbnail: getProductImage(product),
});
