import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiFilter } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";
import CategoryMenu from "../components/CategoryMenu";
import EmptyState from "../components/EmptyState";
import FilterSidebar from "../components/FilterSidebar";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import { useProducts } from "../context/ProductContext";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

const PER_PAGE = 12;

const Products = () => {
  const { filteredProducts, loading, error } = useProducts();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [filteredProducts.length]);

  const totalPages = Math.max(Math.ceil(filteredProducts.length / PER_PAGE), 1);
  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, page * PER_PAGE),
    [filteredProducts, page],
  );
  const hasMore = page < totalPages;

  const loadMore = useCallback(() => {
    setPage((currentPage) => Math.min(currentPage + 1, totalPages));
  }, [totalPages]);

  const sentinelRef = useInfiniteScroll({
    enabled: !loading,
    hasMore,
    onLoadMore: loadMore,
  });

  const handlePageChange = (nextPage) => {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Breadcrumb items={[{ label: "Shop" }]} />
      <section className="section-shell py-8">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-100">
              Shop
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950 sm:text-4xl dark:text-white">
              Discover Products
            </h1>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-2xl">
            <SearchBar />
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              className="btn-secondary lg:hidden"
            >
              <FiFilter />
              Filters
            </button>
          </div>
        </div>

        <div className="mb-7">
          <CategoryMenu />
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {filtersOpen && (
            <button
              type="button"
              aria-label="Close filters"
              onClick={() => setFiltersOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
            />
          )}
          <FilterSidebar
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
          />

          <div>
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-slate-500 dark:text-zinc-400">
                {filteredProducts.length} products found
              </p>
            </div>

            {loading ? (
              <Loader count={8} />
            ) : error ? (
              <EmptyState
                title="Products are unavailable"
                description={error}
                actionLabel="Try Again"
                actionTo="/products"
              />
            ) : visibleProducts.length ? (
              <>
                <ProductGrid products={visibleProducts} />
                <div ref={sentinelRef} className="h-10" />
                <div className="mt-8">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <EmptyState
                title="No matching products"
                description="Adjust the filters or search a different category."
                actionLabel="Browse All Products"
                actionTo="/products"
              />
            )}
          </div>
        </div>
      </section>
    </motion.main>
  );
};

export default Products;
