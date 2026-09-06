import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { compactProduct, getDiscountedPrice } from "../utils/formatters";

const CartContext = createContext(null);

const COUPONS = {
  General10: 0.1,
  FLASH15: 0.15,
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("General_cart", []);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = useCallback(
    (product, quantity = 1) => {
      setCartItems((currentItems) => {
        const normalizedProduct = compactProduct(product);
        const existingItem = currentItems.find(
          (item) => item.id === normalizedProduct.id,
        );

        if (existingItem) {
          return currentItems.map((item) =>
            item.id === normalizedProduct.id
              ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, item.stock || 99),
              }
              : item,
          );
        }

        return [
          ...currentItems,
          {
            ...normalizedProduct,
            quantity: Math.min(quantity, normalizedProduct.stock || 99),
          },
        ];
      });

      toast.success("Added to cart");
    },
    [setCartItems],
  );

  const removeItem = useCallback(
    (productId) => {
      setCartItems((currentItems) =>
        currentItems.filter((item) => item.id !== productId),
      );
      toast.success("Item removed");
    },
    [setCartItems],
  );

  const increaseQuantity = useCallback(
    (productId) => {
      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stock || 99) }
            : item,
        ),
      );
    },
    [setCartItems],
  );

  const decreaseQuantity = useCallback(
    (productId) => {
      setCartItems((currentItems) =>
        currentItems
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    [setCartItems],
  );

  const emptyCart = useCallback(() => {
    setCartItems([]);
    setAppliedCoupon("");
    setCouponCode("");
    toast.success("Cart emptied");
  }, [setCartItems]);

  const applyCoupon = useCallback(() => {
    const normalizedCode = couponCode.trim().toUpperCase();

    if (!COUPONS[normalizedCode]) {
      toast.error("Try General10 or FLASH15");
      return;
    }

    setAppliedCoupon(normalizedCode);
    toast.success(`${normalizedCode} applied`);
  }, [couponCode]);

  const totals = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => {
      const price = getDiscountedPrice(item.price, item.discountPercentage);
      return sum + price * item.quantity;
    }, 0);

    const couponDiscount = appliedCoupon ? subtotal * COUPONS[appliedCoupon] : 0;
    const shipping = subtotal === 0 || subtotal > 2500 ? 0 : 99;
    const tax = Math.max((subtotal - couponDiscount) * 0.045, 0);
    const total = Math.max(subtotal - couponDiscount + shipping + tax, 0);

    return { subtotal, couponDiscount, shipping, tax, total };
  }, [cartItems, appliedCoupon]);

  const cartCount = useMemo(
    () => cartItems.reduce((count, item) => count + item.quantity, 0),
    [cartItems],
  );

  const value = useMemo(
    () => ({
      cartItems,
      cartCount,
      couponCode,
      appliedCoupon,
      isCartOpen,
      totals,
      setCouponCode,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      emptyCart,
      applyCoupon,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      toggleCart: () => setIsCartOpen((current) => !current),
    }),
    [
      cartItems,
      cartCount,
      couponCode,
      appliedCoupon,
      isCartOpen,
      totals,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      emptyCart,
      applyCoupon,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};
