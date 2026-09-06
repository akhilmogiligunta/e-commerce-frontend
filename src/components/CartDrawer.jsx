import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiShoppingBag, FiX } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatters";
import CartItem from "./CartItem";
import EmptyState from "./EmptyState";

const CartDrawer = () => {
  const { cartItems, isCartOpen, closeCart, totals } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-soft dark:bg-zinc-950"
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-zinc-800">
              <h2 className="flex items-center gap-2 text-lg font-extrabold">
                <FiShoppingBag />
                Shopping Cart
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 dark:border-zinc-800"
                aria-label="Close cart"
              >
                <FiX />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cartItems.length ? (
                cartItems.map((item) => (
                  <CartItem key={item.id} item={item} compact />
                ))
              ) : (
                <EmptyState
                  compact
                  title="Your cart is empty"
                  description="Add something sharp and useful before checkout."
                  actionLabel="Start Shopping"
                  actionTo="/products"
                  onAction={closeCart}
                />
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-slate-200 p-5 dark:border-zinc-800">
                <div className="mb-4 flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-zinc-400">Subtotal</span>
                  <span className="font-extrabold">
                    {formatCurrency(totals.subtotal)}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/cart" onClick={closeCart} className="btn-secondary">
                    View Cart
                  </Link>
                  <Link to="/checkout" onClick={closeCart} className="btn-primary">
                    Checkout
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
