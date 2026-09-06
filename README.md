# Modern E-Commerce Website Frontend

A responsive React + Vite storefront built with Tailwind CSS, Context API, React Router, Axios, Framer Motion, React Hot Toast, React Icons, and Swiper.

## Features

- Home page with image hero slider, featured products, categories, best sellers, flash sale, reviews, newsletter, and recently viewed products.
- Products page with search, category filter, price slider, rating filter, sorting, pagination, and infinite loading.
- Product details with gallery, pricing, discount, stock status, quantity selector, add to cart, buy now, wishlist, reviews, and related products.
- Cart with quantity controls, coupon codes, shipping, tax, total calculation, local storage persistence, and cart drawer.
- Checkout UI with shipping address, delivery method, payment method, order summary, and place order flow.
- Wishlist, dark mode, skeleton loaders, toast notifications, responsive layouts, page transitions, 404 page, scroll-to-top, and back navigation.
- Local dummy product fallback with 12 products and 3 image-gallery photos per product.

## API

Products, categories, and product details are fetched from:

```txt
https://dummyjson.com/products
```

If the API is unavailable, the app automatically displays the local catalog from `src/data/dummyProducts.js`.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run lint
npm run build
```
