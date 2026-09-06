import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight, FiTag, FiTrash2 } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";
import CartItem from "../components/CartItem";
import EmptyState from "../components/EmptyState";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatters";

const Cart = () => {
  const {
    cartItems,
    couponCode,
    setCouponCode,
    applyCoupon,
    emptyCart,
    totals,
  } = useCart();

  const handleCouponSubmit = (event) => {
    event.preventDefault();
    applyCoupon();
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Breadcrumb items={[{ label: "Cart" }]} />
      <section className="section-shell py-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
              Cart
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950 sm:text-4xl dark:text-white">
              Shopping Cart
            </h1>
          </div>
          {cartItems.length > 0 && (
            <button type="button" onClick={emptyCart} className="btn-secondary">
              <FiTrash2 />
              Empty Cart
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            description="Browse the collection and add your favorite products."
            actionLabel="Start Shopping"
            actionTo="/products"
          />
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="card p-5">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <aside className="card h-fit p-5 lg:sticky lg:top-24">
              <h2 className="text-xl font-extrabold">Order Summary</h2>
              <form onSubmit={handleCouponSubmit} className="mt-5 flex gap-2">
                <div className="relative flex-1">
                  <FiTag className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={couponCode}
                    onChange={(event) => setCouponCode(event.target.value)}
                    className="input-field pl-11 uppercase"
                    placeholder="General10"
                  />
                </div>
                <button type="submit" className="btn-secondary px-4">
                  Apply
                </button>
              </form>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span>{formatCurrency(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Coupon</span>
                  <span>-{formatCurrency(totals.couponDiscount)}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Shipping</span>
                  <span>{totals.shipping ? formatCurrency(totals.shipping) : "Free"}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Estimated tax</span>
                  <span>{formatCurrency(totals.tax)}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 text-lg font-extrabold dark:border-zinc-800">
                  <div className="flex justify-between">
                    <span>Total</span>
                    <span>{formatCurrency(totals.total)}</span>
                  </div>
                </div>
              </div>

              <Link to="/checkout" className="btn-primary mt-6 w-full">
                Checkout
                <FiArrowRight />
              </Link>
            </aside>
          </div>
        )}
      </section>
    </motion.main>
  );
};

export default Cart;
