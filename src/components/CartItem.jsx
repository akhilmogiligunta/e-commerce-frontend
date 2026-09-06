import { Link } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { formatCurrency, getDiscountedPrice } from "../utils/formatters";

const CartItem = ({ item, compact = false }) => {
  const { increaseQuantity, decreaseQuantity, removeItem } = useCart();
  const price = getDiscountedPrice(item.price, item.discountPercentage);

  return (
    <div className="flex gap-4 border-b border-slate-200 py-4 last:border-b-0 dark:border-zinc-800">
      <Link
        to={`/products/${item.id}`}
        className={`${compact ? "h-20 w-20" : "h-24 w-24"} shrink-0 rounded-lg bg-slate-100 p-2 dark:bg-zinc-800`}
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex gap-3">
          <div className="min-w-0 flex-1">
            <Link
              to={`/products/${item.id}`}
              className="line-clamp-2 text-sm font-bold text-slate-950 hover:text-brand-700 dark:text-white"
            >
              {item.title}
            </Link>
            <p className="mt-1 text-sm font-extrabold text-slate-950 dark:text-white">
              {formatCurrency(price)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10"
            aria-label="Remove item"
          >
            <FiTrash2 />
          </button>
        </div>

        <div className="mt-4 inline-flex items-center overflow-hidden rounded-lg border border-slate-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => decreaseQuantity(item.id)}
            className="inline-flex h-9 w-9 items-center justify-center hover:bg-slate-100 dark:hover:bg-zinc-800"
            aria-label="Decrease quantity"
          >
            <FiMinus />
          </button>
          <span className="inline-flex h-9 min-w-10 items-center justify-center border-x border-slate-200 px-3 text-sm font-bold dark:border-zinc-800">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => increaseQuantity(item.id)}
            className="inline-flex h-9 w-9 items-center justify-center hover:bg-slate-100 dark:hover:bg-zinc-800"
            aria-label="Increase quantity"
          >
            <FiPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
