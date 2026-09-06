import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FiHeart,
  FiMenu,
  FiMoon,
  FiShoppingBag,
  FiSun,
  FiUser,
  FiX,
} from "react-icons/fi";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import SearchBar from "./SearchBar";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Shop" },
  { to: "/products", label: "Categories" },
  { to: "/wishlist", label: "Wishlist" },
];

const Navbar = () => {
  const location = useLocation();
  const { cartCount, openCart } = useCart();
  const { wishlist } = useProducts();
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("General_theme") === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("General_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const linkClass = ({ isActive }) =>
    `text-sm font-bold transition hover:text-brand-700 dark:hover:text-brand-100 ${isActive ? "text-brand-700 dark:text-brand-100" : "text-slate-700 dark:text-zinc-200"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/85">
      <div className="section-shell">
        <div className="flex h-20 items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-lg font-black text-white shadow-glow dark:bg-white dark:text-slate-950">
              G
            </span>
            <span className="hidden text-xl font-black tracking-normal text-slate-950 sm:block dark:text-white">
              General Store
            </span>
          </Link>

          <nav className="ml-4 hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <NavLink key={link.label} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto hidden flex-1 justify-end xl:flex">
            <SearchBar compact />
          </div>

          <div className="ml-auto flex items-center gap-2 xl:ml-3">
            <button
              type="button"
              onClick={() => setDarkMode((current) => !current)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <Link
              to="/wishlist"
              className="relative hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-brand-300 hover:text-brand-700 sm:inline-flex dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              aria-label="Wishlist"
            >
              <FiHeart />
              {wishlist.length > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-[10px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-brand-300 hover:text-brand-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              onClick={openCart}
              aria-label="Open cart"
            >
              <FiShoppingBag />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 lg:inline-flex dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              aria-label="User account"
            >
              <FiUser />
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 lg:hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>

        <div className="pb-4 xl:hidden">
          <SearchBar compact />
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 shadow-soft dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink key={link.label} to={link.to} className={linkClass}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
