// Remote adapter using DummyJSON for products only (auth & orders remain local in starter).
const BASE = "https://dummyjson.com";

const ProductAPI = {
  init() {
    console.log("ProductAPI initialized (DummyJSON)");
  },

  async getProducts(limit = 100) {
    try {
      const res = await fetch(`${BASE}/products?limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      return (data.products || []).map((p) => ({
        id: p.id,
        name: p.title,
        description: p.description,
        price: p.price,
        stock: p.stock,
        category: p.category,
        rating: p.rating,
        images: p.images,
      }));
    } catch (err) {
      console.error("getProducts error:", err);
      return [];
    }
  },

  async getProductById(id) {
    try {
      const res = await fetch(`${BASE}/products/${id}`);
      if (!res.ok) throw new Error("Product not found");
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
    } catch (err) {
      console.error("getProductById error:", err);
      return null;
    }
  },
};

export default ProductAPI;
