import { Link } from "react-router-dom";
import { FiFacebook, FiInstagram, FiMail, FiTwitter } from "react-icons/fi";
import toast from "react-hot-toast";

const Footer = () => {
  const handleNewsletter = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    toast.success("You are on the list");
  };

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="section-shell py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr]">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-lg font-black text-white dark:bg-white dark:text-slate-950">
                G
              </span>
              <span className="text-xl font-black">General Store</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500 dark:text-zinc-400">
              A premium shopping frontend with polished product discovery,
              fast cart flows, and responsive checkout UI.
            </p>
            <div className="mt-5 flex gap-3">
              {[FiFacebook, FiInstagram, FiTwitter].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-brand-300 hover:text-brand-700 dark:border-zinc-800 dark:text-zinc-300"
                  aria-label="Social link"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wide">
              Company
            </h3>
            <div className="space-y-3 text-sm text-slate-500 dark:text-zinc-400">
              <Link to="/" className="block hover:text-brand-700">
                About
              </Link>
              <Link to="/" className="block hover:text-brand-700">
                Contact
              </Link>
              <Link to="/" className="block hover:text-brand-700">
                Careers
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wide">
              Support
            </h3>
            <div className="space-y-3 text-sm text-slate-500 dark:text-zinc-400">
              <Link to="/" className="block hover:text-brand-700">
                Privacy
              </Link>
              <Link to="/" className="block hover:text-brand-700">
                Terms
              </Link>
              <Link to="/cart" className="block hover:text-brand-700">
                Orders
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-extrabold uppercase tracking-wide">
              Newsletter
            </h3>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <div className="relative flex-1">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  className="input-field pl-11"
                />
              </div>
              <button type="submit" className="btn-primary px-4">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-sm text-slate-500 dark:border-zinc-800 dark:text-zinc-500">
          Copyright 2026 General Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
