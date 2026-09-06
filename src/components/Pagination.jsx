const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2">
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          onClick={() => onPageChange(page)}
          className={`inline-flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm font-bold transition ${
            currentPage === page
              ? "border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950"
              : "border-slate-200 bg-white text-slate-700 hover:border-brand-300 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
          }`}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
