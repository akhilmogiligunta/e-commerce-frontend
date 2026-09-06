import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const Breadcrumb = ({ items = [] }) => (
  <nav className="section-shell pt-6" aria-label="Breadcrumb">
    <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-zinc-400">
      <li>
        <Link to="/" className="font-semibold hover:text-brand-700">
          Home
        </Link>
      </li>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <FiChevronRight />
          {item.to ? (
            <Link to={item.to} className="font-semibold hover:text-brand-700">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-slate-900 dark:text-zinc-100">
              {item.label}
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumb;
