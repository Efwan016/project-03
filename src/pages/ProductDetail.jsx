import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../store/products";
import { useCart } from "../store/cart";
import api from "../api";
import { formatCurrency } from "../utils/formatCurrency";
import { toast } from "react-toastify";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, refresh } = useProducts();
  const [product, setProduct] = useState(null);
   const addItem = useCart((s) => s.addItem);

  useEffect(() => {
    (async () => {
      if (products.length === 0) await refresh();
      let found = products.find((p) => String(p.id) === id);

      // fallback ke API kalau gak ketemu
      if (!found) {
        try {
          found = await api.getProductById(id);
        } catch (error) {
          console.error("Produk tidak ditemukan di API:", error);
        }
      }

      setProduct(found || null);
    })();
  }, [id, products, refresh]);

  if (!product) return <div className="text-center mt-10 text-gray-500">Produk tidak ditemukan.</div>;
  const productImage = product.image || product.images?.[0] || "/placeholder.png";

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success(`🛒 ${product.name} berhasil ditambahkan ke keranjang!`);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 p-6">
      <img
        src={productImage}
        alt={product.name}
        className="w-full h-auto rounded-xl shadow-md object-cover"
      />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="text-zinc-400 mt-1">{product.category}</div>
        <div className="text-xl font-bold mt-2">{formatCurrency(product.price)}</div>
        <p className="mt-4 text-gray-700">{product.description || "No description."}</p>
        <button
          onClick={handleAddToCart}
          className="mt-6 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium"
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}
