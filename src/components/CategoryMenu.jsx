import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

const CategoryMenu = () => {
  const { categories, selectedCategory, setSelectedCategory } = useProducts();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.slice(0, 12).map((category) => (
        <Link
          key={category.slug}
          to="/products"
          onClick={() => setSelectedCategory(category.slug)}
          className={`whitespace-nowrap rounded-lg border px-4 py-2 text-sm font-semibold transition ${
            selectedCategory === category.slug
              ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
              : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 hover:text-brand-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          }`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryMenu;
