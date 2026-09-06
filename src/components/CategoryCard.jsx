import { Link } from "react-router-dom";
import {
  FiCoffee,
  FiGift,
  FiGrid,
  FiHeart,
  FiHome,
  FiMonitor,
  FiShoppingBag,
  FiSmartphone,
  FiWatch,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useProducts } from "../context/ProductContext";

const iconMap = {
  beauty: FiHeart,
  fragrances: FiGift,
  furniture: FiHome,
  groceries: FiCoffee,
  laptops: FiMonitor,
  "mens-shirts": FiShoppingBag,
  "mens-shoes": FiShoppingBag,
  "mens-watches": FiWatch,
  smartphones: FiSmartphone,
  tablets: FiSmartphone,
  "womens-bags": FiShoppingBag,
  "womens-dresses": FiShoppingBag,
  "womens-jewellery": FiGift,
  "womens-shoes": FiShoppingBag,
  "womens-watches": FiWatch,
};

const CategoryCard = ({ category, count = 0 }) => {
  const { setSelectedCategory } = useProducts();
  const Icon = iconMap[category.slug] || FiGrid;

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
      <Link
        to="/products"
        onClick={() => setSelectedCategory(category.slug)}
        className="card flex h-full items-center gap-4 p-4 hover:border-brand-200 hover:shadow-soft dark:hover:border-brand-600"
      >
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-xl text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
          <Icon />
        </span>
        <span>
          <span className="block text-sm font-bold text-slate-950 dark:text-white">
            {category.name}
          </span>
          <span className="mt-1 block text-xs font-medium text-slate-500 dark:text-zinc-400">
            {count || "Curated"} items
          </span>
        </span>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
