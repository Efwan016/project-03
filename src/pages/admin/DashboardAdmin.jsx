import { useEffect, useMemo, useRef, useState } from "react";
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

  const refreshed = useRef(false);
  const [selectedSeller, setSelectedSeller] = useState("all"); // filter per seller

  useEffect(() => {
    if (!refreshed.current) {
      refreshed.current = true;
      (async () => {
        if (products.length === 0) await refreshProducts();
        if (users.length === 0) await refreshUsers();
        if (orders.length === 0) await refreshOrders();
      })();
    }
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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="mb-6">
        <label className="mr-4 font-medium">Filter by Seller:</label>
        <select
          value={selectedSeller}
          onChange={e => setSelectedSeller(e.target.value)}
          className="p-1 border bg-transparent rounded"
        >
          <option value="all">All Sellers</option>
          {sellers.map(s => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className=" dark:bg-zinc-900 p-4 rounded-xl shadow">
          <div className="text-gray-500">Total Products</div>
          <div className="text-2xl font-bold">{stats.totalProducts}</div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
          <div className="text-gray-500">Total Users</div>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
          <div className="text-gray-500">Total Sellers</div>
          <div className="text-2xl font-bold">{stats.totalSellers}</div>
        </div>
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
          <div className="text-gray-500">Total Orders</div>
          <div className="text-2xl font-bold">{stats.totalOrders}</div>
        </div>
      </div>

      <div className=" dark:bg-zinc-900 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Overview Chart</h2>
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
      </div>
    </div>
  );
}
