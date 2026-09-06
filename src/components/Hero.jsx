import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiArrowRight, FiShoppingBag, FiZap } from "react-icons/fi";

const slides = [
  {
    title: "Premium Finds, Delivered Fast",
    subtitle:
      "Fresh fashion, smart tech, home upgrades, and everyday essentials in one polished storefront.",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=2200&q=80",
  },
  {
    title: "Style Your Week",
    subtitle:
      "Discover top-rated apparel, accessories, beauty picks, and limited deals before they move.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2200&q=80",
  },
  {
    title: "Smart Home, Better Days",
    subtitle:
      "Shop thoughtful upgrades across electronics, furniture, decor, and daily-use essentials.",
    image:
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=2200&q=80",
  },
];

const Hero = () => (
  <section className="relative overflow-hidden bg-slate-950">
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{ delay: 4500, disableOnInteraction: false }}
      loop
      pagination={{ clickable: true }}
      className="hero-swiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.title}>
          <div className="relative min-h-[72vh]">
            <img
              src={slide.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/48 to-slate-950/10" />
            <div className="section-shell relative z-10 flex min-h-[72vh] items-center pb-12 pt-28">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl text-white"
              >
                <span className="mb-5 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold backdrop-blur">
                  <FiZap className="text-accent-500" />
                  Flash sale live today
                </span>
                <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-xl text-base leading-8 text-white/82 sm:text-lg">
                  {slide.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/products" className="btn-primary">
                    <FiShoppingBag />
                    Shop Collection
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-slate-950"
                  >
                    Explore Deals
                    <FiArrowRight />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </section>
);

export default Hero;
