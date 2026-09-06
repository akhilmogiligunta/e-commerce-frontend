import { AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
    <AnimatePresence>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </AnimatePresence>
  </div>
);

export default ProductGrid;
