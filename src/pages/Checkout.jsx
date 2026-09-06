import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiCheckCircle,
  FiCreditCard,
  FiHome,
  FiMapPin,
  FiTruck,
} from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";
import EmptyState from "../components/EmptyState";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatters";

const deliveryMethods = [
  { id: "standard", label: "Standard", detail: "3-5 business days", cost: 0 },
  { id: "express", label: "Express", detail: "1-2 business days", cost: 149 },
];

const paymentMethods = [
  { id: "card", label: "Credit Card", icon: FiCreditCard },
  { id: "upi", label: "UPI", icon: FiCheckCircle },
  { id: "cod", label: "Cash on Delivery", icon: FiHome },
];

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totals, emptyCart } = useCart();
  const [delivery, setDelivery] = useState("standard");
  const [payment, setPayment] = useState("card");

  const selectedDelivery =
    deliveryMethods.find((method) => method.id === delivery) || deliveryMethods[0];
  const grandTotal = totals.total + selectedDelivery.cost;

  const handlePlaceOrder = (event) => {
    event.preventDefault();

    if (!cartItems.length) {
      toast.error("Your cart is empty");
      return;
    }

    toast.success("Order placed successfully");
    emptyCart();
    navigate("/");
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Breadcrumb items={[{ label: "Checkout" }]} />
      <section className="section-shell py-8">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
            Checkout
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950 sm:text-4xl dark:text-white">
            Complete Your Order
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <EmptyState
            title="Nothing to checkout"
            description="Add products to your cart before placing an order."
            actionLabel="Shop Products"
            actionTo="/products"
          />
        ) : (
          <form
            onSubmit={handlePlaceOrder}
            className="grid gap-8 lg:grid-cols-[1fr_380px]"
          >
            <div className="space-y-6">
              <section className="card p-5 sm:p-6">
                <h2 className="flex items-center gap-2 text-xl font-extrabold">
                  <FiMapPin />
                  Shipping Address
                </h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <input className="input-field" required placeholder="Full name" />
                  <input className="input-field" required placeholder="Phone number" />
                  <input
                    className="input-field sm:col-span-2"
                    required
                    placeholder="Street address"
                  />
                  <input className="input-field" required placeholder="City" />
                  <input className="input-field" required placeholder="Postal code" />
                </div>
              </section>

              <section className="card p-5 sm:p-6">
                <h2 className="flex items-center gap-2 text-xl font-extrabold">
                  <FiTruck />
                  Delivery Method
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {deliveryMethods.map((method) => (
                    <label
                      key={method.id}
                      className={`cursor-pointer rounded-lg border p-4 transition ${
                        delivery === method.id
                          ? "border-brand-600 bg-brand-50 dark:bg-brand-500/15"
                          : "border-slate-200 dark:border-zinc-800"
                      }`}
                    >
                      <input
                        type="radio"
                        name="delivery"
                        value={method.id}
                        checked={delivery === method.id}
                        onChange={(event) => setDelivery(event.target.value)}
                        className="sr-only"
                      />
                      <span className="block font-extrabold">{method.label}</span>
                      <span className="mt-1 block text-sm text-slate-500 dark:text-zinc-400">
                        {method.detail}
                      </span>
                      <span className="mt-2 block text-sm font-bold">
                        {method.cost ? formatCurrency(method.cost) : "Free"}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              <section className="card p-5 sm:p-6">
                <h2 className="flex items-center gap-2 text-xl font-extrabold">
                  <FiCreditCard />
                  Payment Method
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {paymentMethods.map((method) => {
                    const Icon = method.icon;
                    return (
                      <label
                        key={method.id}
                        className={`cursor-pointer rounded-lg border p-4 transition ${
                          payment === method.id
                            ? "border-brand-600 bg-brand-50 dark:bg-brand-500/15"
                            : "border-slate-200 dark:border-zinc-800"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={payment === method.id}
                          onChange={(event) => setPayment(event.target.value)}
                          className="sr-only"
                        />
                        <Icon className="mb-3 text-xl text-brand-700 dark:text-brand-100" />
                        <span className="text-sm font-extrabold">{method.label}</span>
                      </label>
                    );
                  })}
                </div>
                {payment === "card" && (
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <input
                      className="input-field sm:col-span-2"
                      placeholder="Card number"
                      inputMode="numeric"
                    />
                    <input className="input-field" placeholder="MM / YY" />
                    <input className="input-field" placeholder="CVV" inputMode="numeric" />
                  </div>
                )}
              </section>
            </div>

            <aside className="card h-fit p-5 lg:sticky lg:top-24">
              <h2 className="text-xl font-extrabold">Order Summary</h2>
              <div className="mt-5 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-16 w-16 shrink-0 rounded-lg bg-slate-100 p-2 dark:bg-zinc-800">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-bold">{item.title}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                        Qty {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3 border-t border-slate-200 pt-5 text-sm dark:border-zinc-800">
                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>Cart total</span>
                  <span>{formatCurrency(totals.total)}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-zinc-400">
                  <span>{selectedDelivery.label} delivery</span>
                  <span>
                    {selectedDelivery.cost
                      ? formatCurrency(selectedDelivery.cost)
                      : "Free"}
                  </span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-4 text-lg font-extrabold dark:border-zinc-800">
                  <span>Total</span>
                  <span>{formatCurrency(grandTotal)}</span>
                </div>
              </div>

              <button type="submit" className="btn-primary mt-6 w-full">
                Place Order
              </button>
              <Link to="/cart" className="btn-secondary mt-3 w-full">
                Back to Cart
              </Link>
            </aside>
          </form>
        )}
      </section>
    </motion.main>
  );
};

export default Checkout;
