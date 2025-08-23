import { useEffect, useMemo, useState } from "react";
import { useProducts } from "../../store/products";
import { useUsers } from "../../store/users";
import { useOrders } from "../../store/orders";
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
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Welcome, Admin 👋
        </h2>
      </header>

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
