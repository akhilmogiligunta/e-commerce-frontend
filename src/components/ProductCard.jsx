import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEye, FiHeart, FiShoppingBag } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import {
  formatCurrency,
  getDiscountedPrice,
  getProductImage,
} from "../utils/formatters";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useProducts();
  const discountedPrice = getDiscountedPrice(
    product.price,
    product.discountPercentage,
  );
  const liked = isWishlisted(product.id);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="card group overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 dark:bg-zinc-800">
        <Link to={`/products/${product.id}`} aria-label={product.title}>
          <img
            src={getProductImage(product)}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-105"
          />
        </Link>
        <span className="absolute left-3 top-3 rounded-md bg-accent-500 px-2.5 py-1 text-xs font-bold text-white shadow">
          {Math.round(product.discountPercentage || 0)}% OFF
        </span>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={`absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/70 bg-white/90 text-lg shadow-sm transition hover:scale-105 dark:border-zinc-700 dark:bg-zinc-900/90 ${liked ? "text-rose-500" : "text-slate-700 dark:text-zinc-100"
            }`}
          aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
        >
          <FiHeart fill={liked ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex min-h-[218px] flex-col p-2">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-brand-600 dark:text-brand-100">
          {product.brand || product.category}
        </p>
        <Link
          to={`/products/${product.id}`}
          className="line-clamp-2 min-h-11 text-sm font-bold text-slate-950 transition hover:text-brand-700 dark:text-zinc-50"
        >
          {product.title}
        </Link>
        <div className="mt-">
          <Rating value={product.rating || 0} compact />
        </div>

        <div className="mt-4 flex items-end justify-between gap-3 p-1">
          <div>
            <p className="text-lg font-extrabold text-slate-950 dark:text-white">
              {formatCurrency(discountedPrice)}
            </p>
            <p className="text-xs text-slate-400 line-through">
              {formatCurrency(product.price)}
            </p>
          </div>
          <Link
            to={`/products/${product.id}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-zinc-800 dark:text-zinc-100"
            aria-label="Quick view"
          >
            <FiEye />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => addItem(product)}
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 dark:bg-white dark:text-slate-950 dark:hover:bg-brand-100"
        >
          <FiShoppingBag />
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
};

export default memo(ProductCard);
