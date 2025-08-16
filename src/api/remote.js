// Remote adapter using DummyJSON for products only (auth & orders remain local in starter).
const BASE = "https://dummyjson.com";

export default {
  init() {},

  async getProducts() {
    const res = await fetch(`${BASE}/products?limit=100`);
    const data = await res.json();
    // Map to local shape:
    return (data.products || []).map(p => ({
      id: p.id,
      name: p.title,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: p.category,
      rating: p.rating,
      images: p.images,
    }));
  },

  async getProductById(id) {
    const res = await fetch(`${BASE}/products/${id}`);
    const p = await res.json();
    return {
      id: p.id,
      name: p.title,
      description: p.description,
      price: p.price,
      stock: p.stock,
      category: p.category,
      rating: p.rating,
      images: p.images,
    };
  },
};
