import { FiSliders, FiX } from "react-icons/fi";
import { useProducts } from "../context/ProductContext";
import { formatCurrency } from "../utils/formatters";

const ratingFilters = [0, 4.5, 4, 3];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name" },
  { value: "discount", label: "Biggest Discount" },
];

const FilterSidebar = ({ isOpen = false, onClose }) => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    priceLimit,
    setPriceLimit,
    maxPrice,
    minRating,
    setMinRating,
    sortBy,
    setSortBy,
    resetFilters,
  } = useProducts();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-[86vw] max-w-sm border-r border-slate-200 bg-white p-5 shadow-soft transition-transform duration-300 dark:border-zinc-800 dark:bg-zinc-950 lg:sticky lg:top-24 lg:z-0 lg:w-full lg:max-w-none lg:translate-x-0 lg:rounded-lg lg:border lg:shadow-sm ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-6 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-base font-extrabold">
          <FiSliders />
          Filters
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 lg:hidden dark:border-zinc-800"
          aria-label="Close filters"
        >
          <FiX />
        </button>
      </div>

      <div className="space-y-7">
        <div>
          <label className="mb-2 block text-sm font-bold">Category</label>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="input-field"
          >
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-bold">Max Price</label>
            <span className="text-sm font-bold text-brand-700 dark:text-brand-100">
              {formatCurrency(priceLimit)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceLimit}
            onChange={(event) => setPriceLimit(Number(event.target.value))}
            className="h-2 w-full cursor-pointer accent-brand-600"
          />
        </div>

        <div>
          <label className="mb-3 block text-sm font-bold">Rating</label>
          <div className="grid grid-cols-2 gap-2">
            {ratingFilters.map((rating) => (
              <button
                type="button"
                key={rating}
                onClick={() => setMinRating(rating)}
                className={`rounded-lg border px-3 py-2 text-sm font-semibold transition ${
                  minRating === rating
                    ? "border-brand-600 bg-brand-50 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100"
                    : "border-slate-200 text-slate-600 hover:border-brand-300 dark:border-zinc-800 dark:text-zinc-300"
                }`}
              >
                {rating === 0 ? "All" : `${rating}+`}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-bold">Sort By</label>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="input-field"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <button type="button" onClick={resetFilters} className="btn-secondary w-full">
          Reset Filters
        </button>
      </div>
    </aside>
  );
};

export default FilterSidebar;
