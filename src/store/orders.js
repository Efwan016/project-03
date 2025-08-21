import { create } from "zustand";

const useOrders = create((set) => ({
  orders: [],

  refresh: async () => {
    const stored = JSON.parse(localStorage.getItem("orders")) || [];
    set({ orders: stored });
  },

  addOrder: (order) => {
    set((state) => {
      const updated = [...state.orders, order];
      localStorage.setItem("orders", JSON.stringify(updated));
      return { orders: updated };
    });
  },

  updateOrder: (id, newData) => {
    set((state) => {
      const updated = state.orders.map((o) => (o.id === id ? { ...o, ...newData } : o));
      localStorage.setItem("orders", JSON.stringify(updated));
      return { orders: updated };
    });
  },

  deleteOrder: (id) => {
    set((state) => {
      const updated = state.orders.filter((o) => o.id !== id);
      localStorage.setItem("orders", JSON.stringify(updated));
      return { orders: updated };
    });
  },
}));

export { useOrders };