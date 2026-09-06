const SkeletonCard = () => (
  <div className="card overflow-hidden">
    <div className="h-56 animate-pulse bg-slate-100 dark:bg-zinc-800" />
    <div className="space-y-3 p-4">
      <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100 dark:bg-zinc-800" />
      <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100 dark:bg-zinc-800" />
      <div className="h-10 animate-pulse rounded-lg bg-slate-100 dark:bg-zinc-800" />
    </div>
  </div>
);

const Loader = ({ type = "grid", count = 8 }) => {
  if (type === "page") {
    return (
      <div className="section-shell flex min-h-[55vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-brand-500 dark:border-zinc-800 dark:border-t-brand-500" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default Loader;
