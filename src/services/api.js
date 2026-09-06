import axios from "axios";
import {
  dummyCategories,
  dummyProducts,
  getDummyProductById,
  getDummyProductsByCategory,
} from "../data/dummyProducts";
import { slugToTitle } from "../utils/formatters";

const api = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 12000,
});

const normalizeCategory = (category) => {
  if (typeof category === "string") {
    return { slug: category, name: slugToTitle(category) };
  }

  return {
    slug: category.slug || category.name,
    name: category.name || slugToTitle(category.slug || ""),
    url: category.url,
  };
};

export const getProducts = async () => {
  try {
    const { data } = await api.get("/products", {
      params: { limit: 100 },
    });

    return data.products?.length ? data.products : dummyProducts;
  } catch (error) {
    console.warn("Using local dummy products because the API failed.", error);
    return dummyProducts;
  }
};

export const getProductById = async (id) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return data;
  } catch (error) {
    const fallbackProduct = getDummyProductById(id);
    if (fallbackProduct) return fallbackProduct;
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const { data } = await api.get("/products/categories");
    const categories = (data || []).map(normalizeCategory);
    return categories.length ? categories : dummyCategories;
  } catch (error) {
    console.warn("Using local dummy categories because the API failed.", error);
    return dummyCategories;
  }
};

export const getProductsByCategory = async (category, limit = 8) => {
  try {
    const { data } = await api.get(`/products/category/${category}`, {
      params: { limit },
    });

    return data.products?.length
      ? data.products
      : getDummyProductsByCategory(category, limit);
  } catch (error) {
    console.warn("Using local category products because the API failed.", error);
    return getDummyProductsByCategory(category, limit);
  }
};

export default api;
