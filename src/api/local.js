// Local adapter: initializes from JSON files into localStorage, then reads/writes there.
import usersData from "../data/users.json";
import productsData from "../data/products.json";
import storesData from "../data/stores.json";
import ordersData from "../data/orders.json";

const KEYS = {
  USERS: "mm_users",
  PRODUCTS: "mm_products",
  STORES: "mm_stores",
  ORDERS: "mm_orders",
  AUTH_USER: "auth_user",
};

function seed(key, data) {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(data));
  }
}

const LocalApi = {
  init() {
    seed(KEYS.USERS, usersData);
    seed(KEYS.PRODUCTS, productsData);
    seed(KEYS.STORES, storesData);
    seed(KEYS.ORDERS, ordersData);
  },

  async getProducts() {
    const items = JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || "[]");
    return items;
  },

  async getProductById(id) {
    const items = await this.getProducts();
    return items.find(p => String(p.id) === String(id));
  },

  async getUsers() {
    return JSON.parse(localStorage.getItem(KEYS.USERS) || "[]");
  },

  async login(email, password) {
    const users = await this.getUsers();
    const u = users.find(x => x.email === email && x.password === password);
    return u || null;
  },

  async createOrder(order) {
    const orders = JSON.parse(localStorage.getItem(KEYS.ORDERS) || "[]");
    const nextId = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1001;
    const payload = {
      id: nextId,
      ...order,
      status: "Pending",
      createdAt: new Date().toISOString()
    };

    const updated = [...orders, payload];
    localStorage.setItem(KEYS.ORDERS, JSON.stringify(updated));
    return payload;
  },

  async getOrdersByUserId(userId) {
    const orders = JSON.parse(localStorage.getItem(KEYS.ORDERS) || "[]");
    return orders.filter(o => String(o.userId) === String(userId));
  },

  async getCategories() {
    const items = JSON.parse(localStorage.getItem(KEYS.PRODUCTS) || "[]");
    // ambil kategori unik dari product
    const categories = [...new Set(items.map(p => p.category))];
    return categories;
  },

};



export default LocalApi;