import { create } from "zustand";

const persisted = JSON.parse(localStorage.getItem("mm_cart") || "[]");

export const useCart = create((set, get) => ({
  items: persisted,

  // langsung jadi fungsi, bukan getter
  totalQty: () => get().items.reduce((a, b) => a + (b.qty || 1), 0),
  total: () => get().items.reduce((a, b) => a + (b.price * (b.qty || 1)), 0),

  addItem(product, qty = 1) {
    console.log(">>> ADD ITEM", product); // cek apa isi product
    const items = [...get().items];
    const idx = items.findIndex((it) => it.id === product.id);

    const safePrice = Number(product.price) || 0; // paksa number

    if (idx >= 0) {
      items[idx].qty = (items[idx].qty || 1) + qty;
    } else {
      items.push({ ...product, qty, price: safePrice });
    }

    console.log(">>> ITEMS:", items); // cek hasil akhir sebelum disimpan

    localStorage.setItem("mm_cart", JSON.stringify(items));
    set({ items });
  },

  updateQty(id, qty) {
    const items = get().items.map((it) =>
      it.id === id ? { ...it, qty } : it
    );
    localStorage.setItem("mm_cart", JSON.stringify(items));
    set({ items });
  },

  removeItem(id) {
    const items = get().items.filter((it) => it.id !== id);
    localStorage.setItem("mm_cart", JSON.stringify(items));
    set({ items });
  },

  clear() {
    localStorage.removeItem("mm_cart");
    set({ items: [] });
  },
}));
