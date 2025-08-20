// src/store/product.js
import { create } from "zustand";

export const useProducts = create((set) => ({
  products: JSON.parse(localStorage.getItem("products")) || [],

  addProduct: (product) =>
    set((state) => {
      const updated = [...state.products, product];
      localStorage.setItem("products", JSON.stringify(updated));
      return { products: updated };
    }),

  deleteProduct: (id) =>
    set((state) => {
      const updated = state.products.filter((p) => p.id !== id);
      localStorage.setItem("products", JSON.stringify(updated));
      return { products: updated };
    }),

  updateProduct: (id, updatedProduct) =>
    set((state) => {
      const updated = state.products.map((p) =>
        p.id === id ? { ...p, ...updatedProduct } : p
      );
      localStorage.setItem("products", JSON.stringify(updated));
      return { products: updated };
    }),
}));
