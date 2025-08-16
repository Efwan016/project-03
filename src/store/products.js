import { create } from "zustand";
import api from "../api";

export const useProducts = create((set) => ({
  products: [],
  setProducts: (items) => set({ products: items }),
  async refresh() {
    const data = await api.getProducts();
    set({ products: data });
  }
}));
