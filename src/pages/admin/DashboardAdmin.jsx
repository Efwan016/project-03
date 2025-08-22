import { useEffect, useMemo, useState } from "react";
import { useProducts } from "../../store/products";
import { useUsers } from "../../store/users";
import { useOrders } from "../../store/orders";
import { Menu, X } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function DashboardAdmin() {
  const [open, setOpen] = useState(false);
  const { products, refresh: refreshProducts } = useProducts();
  const { users, refresh: refreshUsers } = useUsers();
  const { orders, refresh: refreshOrders } = useOrders();

  const [selectedSeller, setSelectedSeller] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    (async () => {
      if (products.length === 0) await refreshProducts();
      if (users.length === 0) await refreshUsers();
      if (orders.length === 0) await refreshOrders();
    })();
  }, [refreshProducts, refreshUsers, refreshOrders, products.length, users.length, orders.length]);

  const sellers = useMemo(
    () => users.filter(u => u.role === "seller"),
    [users]
  );

  const filteredProducts = useMemo(
    () =>
      selectedSeller === "all"
        ? products
        : products.filter(p => p.sellerId === selectedSeller),
    [products, selectedSeller]
  );

  const filteredOrders = useMemo(
    () =>
      selectedSeller === "all"
        ? orders
        : orders.filter(o =>
          o.items.some(item => item.sellerId === selectedSeller)
        ),
    [orders, selectedSeller]
  );

  const stats = useMemo(
    () => ({
      totalProducts: filteredProducts.length,
      totalUsers: users.filter(u => u.role === "user").length,
      totalSellers: sellers.length,
      totalOrders: filteredOrders.length,
    }),
    [filteredProducts, filteredOrders, users, sellers]
  );

  const chartData = [
    { name: "Products", count: stats.totalProducts },
    { name: "Users", count: stats.totalUsers },
    { name: "Sellers", count: stats.totalSellers },
    { name: "Orders", count: stats.totalOrders },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 flex flex-col">
      {/* HEADER */}
      <header className="bg-white dark:bg-zinc-900 shadow-md px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Welcome, Admin 👋
        </h2>
      </header>

      {/* SIDEBAR POPUP */}
      {open && (
        <div className="fixed inset-0 z-40 flex">
          {/* Background Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          ></div>

          {/* Sidebar Content */}
          <div className="relative w-64 bg-white dark:bg-zinc-900 shadow-xl p-6 z-50 animate-slideIn">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-200 dark:hover:bg-zinc-800 rounded-lg"
            >
              <X size={20} />
            </button>

            <nav className="mt-12 space-y-4">
              <a href="/admin" className="block font-medium hover:text-indigo-600">
                Dashboard
              </a>
              <a href="/admin/users" className="block font-medium hover:text-indigo-600">
                Manage Users
              </a>
              <a href="/admin/stores" className="block font-medium hover:text-indigo-600">
                Manage Stores
              </a>
              <a href="/admin/products" className="block font-medium hover:text-indigo-600">
                Manage Products
              </a>
              <a href="/admin/reports" className="block font-medium hover:text-indigo-600">
                Reports
              </a>
            </nav>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-8">
        {/* FILTER SELLER */}
        <div className="mb-8">
          <label className="mr-4 font-medium">Filter by Seller:</label>
          <select
            value={selectedSeller}
            onChange={e => setSelectedSeller(e.target.value)}
            className="px-3 py-2 border rounded-lg bg-white dark:bg-zinc-900"
          >
            <option value="all">All Sellers</option>
            {sellers.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow">
            <div className="text-gray-500">Total Products</div>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow">
            <div className="text-gray-500">Total Users</div>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow">
            <div className="text-gray-500">Total Sellers</div>
            <div className="text-2xl font-bold">{stats.totalSellers}</div>
          </div>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow">
            <div className="text-gray-500">Total Orders</div>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
          </div>
        </div>

        {/* TABS */}
        <div className="flex gap-4 mb-8">
          {["overview", "users", "stores", "products", "reports"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg font-medium transition shadow-sm ${activeTab === tab
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300"
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* TAB CONTENT */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow">
          {activeTab === "overview" && (
            <>
              <h3 className="text-xl font-bold mb-6">Overview Chart</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {/* other tab content tetap sama */}
        </div>
      </main>
    </div>


  );
}
