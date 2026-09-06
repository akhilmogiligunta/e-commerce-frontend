import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";

const NotFound = () => (
  <motion.main
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
    className="section-shell flex min-h-[70vh] items-center justify-center py-12 text-center"
  >
    <div>
      <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
        404
      </p>
      <h1 className="mt-3 text-4xl font-black text-slate-950 sm:text-6xl dark:text-white">
        Page Not Found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-slate-500 dark:text-zinc-400">
        The page you are looking for is not available in this storefront.
      </p>
      <Link to="/" className="btn-primary mt-8">
        <FiArrowLeft />
        Go Home
      </Link>
    </div>
  </motion.main>
);

export default NotFound;
