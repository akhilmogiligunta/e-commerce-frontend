import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiArrowRight, FiMail } from "react-icons/fi";
import toast from "react-hot-toast";
import CategoryCard from "../components/CategoryCard";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import { useProducts } from "../context/ProductContext";

const reviews = [
  {
    name: "Aarav Mehta",
    role: "Verified buyer",
    text: "The UI is fast, the cart feels smooth, and the product discovery flow feels very premium.",
  },
  {
    name: "Nisha Rao",
    role: "Repeat customer",
    text: "Filters, wishlist, and checkout are exactly where I expect them. It feels polished on mobile.",
  },
  {
    name: "Kabir Sethi",
    role: "Tech shopper",
    text: "Great product pages, clear pricing, and a clean experience without visual clutter.",
  },
];

const NewsletterBand = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    toast.success("Deal alerts enabled");
  };

  return (
    <section className="bg-slate-950 py-14 text-white dark:bg-zinc-900">
      <div className="section-shell grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-brand-100">
            Newsletter
          </p>
          <h2 className="mt-2 text-3xl font-extrabold">
            First access to drops, edits, and flash deals.
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              required
              type="email"
              placeholder="Enter your email"
              className="input-field border-white/10 bg-white/10 pl-11 text-white placeholder:text-white/55"
            />
          </div>
          <button type="submit" className="btn-primary bg-white text-slate-950">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

const ProductCarousel = ({ products }) => (
  <Swiper
    modules={[Navigation]}
    navigation
    spaceBetween={20}
    breakpoints={{
      320: { slidesPerView: 1.15 },
      640: { slidesPerView: 2.2 },
      1024: { slidesPerView: 3.2 },
      1280: { slidesPerView: 4 },
    }}
  >
    {products.map((product) => (
      <SwiperSlide key={product.id} className="pb-2 bg-blue-600">
        <ProductCard product={product} />
      </SwiperSlide>
    ))}
  </Swiper>
);

const Home = () => {
  const {
    products,
    categories,
    loading,
    featuredProducts,
    bestSellers,
    flashSaleProducts,
  } = useProducts();

  const categoryCounts = products.reduce((counts, product) => {
    counts[product.category] = (counts[product.category] || 0) + 1;
    return counts;
  }, {});

  const recentIds = JSON.parse(localStorage.getItem("ofzen_recently_viewed") || "[]");
  const recentlyViewed = recentIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean)
    .slice(0, 4);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Hero />

      <section className="section-shell py-14">
        <SectionHeading
          eyebrow="Featured"
          title="Handpicked For A Better Cart"
          action={
            <Link to="/products" className="btn-secondary">
              View All <FiArrowRight />
            </Link>
          }
        />
        {loading ? (
          <Loader count={4} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-white py-14 dark:bg-zinc-950">
        <div className="section-shell">
          <SectionHeading eyebrow="Categories" title="Shop By Department" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories
              .filter((category) => category.slug !== "all")
              .slice(0, 8)
              .map((category) => (
                <CategoryCard
                  key={category.slug}
                  category={category}
                  count={categoryCounts[category.slug]}
                />
              ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <SectionHeading eyebrow="Best Sellers" title="Loved By Shoppers" />
        {loading ? <Loader count={4} /> : <ProductCarousel products={bestSellers} />}
      </section>

      <section className="bg-gradient-to-br from-brand-50 via-white to-orange-50 py-14 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Flash Sale"
            title="Big Discounts, Short Window"
            action={
              <Link to="/products" className="btn-primary">
                Grab Deals <FiArrowRight />
              </Link>
            }
          />
          {loading ? (
            <Loader count={4} />
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {flashSaleProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {recentlyViewed.length > 0 && (
        <section className="section-shell py-14">
          <SectionHeading eyebrow="Recently Viewed" title="Pick Up Where You Left Off" />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyViewed.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      <section className="section-shell py-14">
        <SectionHeading eyebrow="Reviews" title="Customers Keep Coming Back" />
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.name} className="card p-6">
              <p className="text-sm leading-7 text-slate-600 dark:text-zinc-300">
                "{review.text}"
              </p>
              <div className="mt-5">
                <p className="font-extrabold">{review.name}</p>
                <p className="text-sm text-slate-500 dark:text-zinc-400">
                  {review.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <NewsletterBand />
    </motion.main>
  );
};

export default Home;
