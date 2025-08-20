import React, { useState, useEffect } from "react";

export default function SellerOrders() {
  const seller = JSON.parse(localStorage.getItem("user"));
  const sellerId = seller?.id; 

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const myOrders = orders
    .map((order) => {
      const myItems = order.items.filter((it) => it.sellerId === sellerId);
      return myItems.length > 0 ? { ...order, items: myItems } : null;
    })
    .filter(Boolean);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">📦 Pesanan Masuk</h2>
      {myOrders.length === 0 ? (
        <p className="text-gray-500 italic">Belum ada pesanan untuk produkmu.</p>
      ) : (
        <div className="overflow-hidden rounded-xl shadow-lg border border-gray-200 bg-white">
          <table className="w-full text-left">
            <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Produk</th>
                <th className="p-3">Status</th>
                <th className="p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order, i) => (
                <tr
                  key={order.id}
                  className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition`}
                >
                  <td className="p-3 font-semibold text-gray-700">#{order.id}</td>
                  <td className="p-3 text-gray-600">{order.customerName}</td>
                  <td className="p-3">
                    {order.items.map((it) => (
                      <div key={it.id} className="flex items-center gap-3 mb-2">
                        <img
                          src={it.images?.[0] || "/placeholder.png"}
                          alt={it.name}
                          className="w-12 h-12 object-cover rounded-lg shadow"
                        />
                        <span className="text-gray-700">
                          {it.name} <span className="text-sm text-gray-500">× {it.quantity}</span>
                        </span>
                      </div>
                    ))}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                        order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="border rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
