import { motion } from "framer-motion";
import Breadcrumb from "../components/Breadcrumb";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import ProductGrid from "../components/ProductGrid";
import { useProducts } from "../context/ProductContext";

const Wishlist = () => {
  const { products, wishlist, loading } = useProducts();
  const wishlistProducts = wishlist
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Breadcrumb items={[{ label: "Wishlist" }]} />
      <section className="section-shell py-8">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
            Wishlist
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950 sm:text-4xl dark:text-white">
            Saved Products
          </h1>
        </div>

        {loading ? (
          <Loader count={8} />
        ) : wishlistProducts.length ? (
          <ProductGrid products={wishlistProducts} />
        ) : (
          <EmptyState
            title="Your wishlist is empty"
            description="Save products you love and revisit them whenever you are ready."
            actionLabel="Explore Products"
            actionTo="/products"
          />
        )}
      </section>
    </motion.main>
  );
};

export default Wishlist;
