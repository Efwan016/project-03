import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";

export default function SellerDashboard({ sellerId }) {
  const [stats, setStats] = useState({
    totalSold: 0,
    totalRevenue: 0,
    activeOrders: 0,
  });
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];

    let totalSold = 0;
    let totalRevenue = 0;
    let activeOrders = 0;

    const grouped = {};

    orders.forEach(order => {
      let isActiveOrder = false;

      order.items.forEach(item => {
        const product = products.find(p => p.id === item.productId);

        if (product && product.sellerId === sellerId) {
          totalSold += item.qty;
          totalRevenue += item.qty * item.price;

          if (order.shippingStatus !== "delivered") {
            isActiveOrder = true;
          }

          // group by month
          const month = new Date(order.createdAt).toLocaleString("default", { month: "short" });
          if (!grouped[month]) grouped[month] = { month, sold: 0, revenue: 0 };
          grouped[month].sold += item.qty;
          grouped[month].revenue += item.qty * item.price;
        }
      });

      if (isActiveOrder) activeOrders++;
    });

    setStats({ totalSold, totalRevenue, activeOrders });
    setChartData(Object.values(grouped));
  }, [sellerId]);

  return (
    <div className="p-6 space-y-6">
      {/* Statistik Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border border-zinc-800 p-4 bg-zinc-900 text-center">
          <h2 className="text-2xl font-bold">{stats.totalSold}</h2>
          <p className="text-zinc-400">Produk Terjual</p>
        </div>

        <div className="rounded-xl border border-zinc-800 p-4 bg-zinc-900 text-center">
          <h2 className="text-2xl font-bold">Rp {stats.totalRevenue.toLocaleString()}</h2>
          <p className="text-zinc-400">Total Revenue</p>
        </div>

        <div className="rounded-xl border border-zinc-800 p-4 bg-zinc-900 text-center">
          <h2 className="text-2xl font-bold">{stats.activeOrders}</h2>
          <p className="text-zinc-400">Pesanan Aktif</p>
        </div>
      </div>

      {/* Grafik */}
      <div className="rounded-xl border border-zinc-800 p-6 bg-zinc-900">
        <h3 className="text-lg font-semibold mb-4">Statistik Penjualan per Bulan</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sold" fill="#4f46e5" name="Produk Terjual" />
            <Bar dataKey="revenue" fill="#22c55e" name="Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/seller/products"
          className="block bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-xl text-center font-semibold"
        >
          Kelola Produk
        </Link>
        <Link
          to="/seller/orders"
          className="block bg-green-600 hover:bg-green-700 text-white p-4 rounded-xl text-center font-semibold"
        >
          Pesanan Saya
        </Link>
      </div>
    </div>
  );
}
