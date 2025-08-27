import LocalApi from "./local";
const BASE = "https://dummyjson.com";

const RemoteApi = {
  ...LocalApi, 

  init() {
    console.log("Remote API initialized (DummyJSON + Local for auth/orders)");
  },

  async getProducts(limit = 100) {
    try {
      const res = await fetch(`${BASE}/products?limit=${limit}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();

      const remoteProducts = (data.products || []).map((p) => ({
        id: `remote-${p.id}`, // biar unik
        name: p.title,
        description: p.description,
        price: p.price,
        stock: p.stock,
        category: p.category,
        rating: p.rating,
        images: p.images,
      }));

      // produk lokal (hasil upload seller)
      const localProducts = await LocalApi.getProducts();

      // gabungin
      return [...localProducts, ...remoteProducts];
    } catch (err) {
      console.error("getProducts error:", err);
      return LocalApi.getProducts();
    }
  },

  async getProductById(id) {
    try {
      // kalau id dari remote prefixed -> ambil dari API
      if (String(id).startsWith("remote-")) {
        const realId = String(id).replace("remote-", "");
        const res = await fetch(`${BASE}/products/${realId}`);
        if (!res.ok) throw new Error("Product not found");
        const p = await res.json();

        return {
          id: `remote-${p.id}`,
          name: p.title,
          description: p.description,
          price: p.price,
          stock: p.stock,
          category: p.category,
          rating: p.rating,
          images: p.images,
        };
      }

      // kalau bukan remote -> fallback ke local
      return LocalApi.getProductById(id);
    } catch (err) {
      console.error("getProductById error:", err);
      return LocalApi.getProductById(id);
    }
  },

  async getCategories() {
    try {
      const res = await fetch(`${BASE}/products/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return await res.json();
    } catch (err) {
      console.error("getCategories error:", err);
      // fallback ke local
      return LocalApi.getCategories();
    }
  },
};

export default RemoteApi;
