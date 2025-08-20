import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MyProducts() {
  const [products, setProducts ] = useState([]);
  const sellerId = 1;

   useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const myProducts = storedProducts.filter(p => p.sellerId === sellerId);
    setProducts(myProducts);
  }, []);

  const handleDelete = (id) => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const updateProducts = storedProducts.filter(p => p.id !== id);
    localStorage.setItem("products", JSON.stringify(updateProducts));
    setProducts(updateProducts.filter(p => p.sellerId === sellerId));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produk Saya</h1>
        <Link 
        to="/seller/products/add" className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white">
          + Tambah Produk
        </Link>
      </div>
       {products.length === 0 ? (
        <p className="text-gray-400">Belum ada produk.</p>
      ) : (
        <table className="w-full border border-zinc-700 text-left text-sm">
          <thead className="bg-zinc-800">
            <tr>
              <th className="p-3">Gambar</th>
              <th className="p-3">Nama Produk</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Harga</th>
              <th className="p-3">Stok</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-zinc-700">
                <td className="p-3">
                  <img
                    src={p.image || "/placeholder.png"}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">Rp {Number(p.price || 0).toLocaleString()}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3 space-x-2">
                  <Link
                    to={`/seller/products/${p.id}/edit`}
                    className="px-3 py-1 rounded bg-yellow-500 hover:bg-yellow-600 text-white text-xs"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-white text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
export default MyProducts;