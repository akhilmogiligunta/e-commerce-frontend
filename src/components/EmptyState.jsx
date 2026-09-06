import { Link } from "react-router-dom";

const EmptyState = ({
  title,
  description,
  actionLabel,
  actionTo,
  onAction,
  compact = false,
}) => (
  <div
    className={`flex flex-col items-center justify-center text-center ${
      compact ? "py-10" : "min-h-[45vh] py-14"
    }`}
  >
    <img
      src="/empty-cart.svg"
      alt=""
      className={`${compact ? "h-36" : "h-52"} mb-6`}
      loading="lazy"
    />
    <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white">
      {title}
    </h2>
    <p className="mt-3 max-w-md text-sm leading-7 text-slate-500 dark:text-zinc-400">
      {description}
    </p>
    {actionLabel && actionTo && (
      <Link to={actionTo} onClick={onAction} className="btn-primary mt-6">
        {actionLabel}
      </Link>
    )}
  </div>
);

export default EmptyState;
