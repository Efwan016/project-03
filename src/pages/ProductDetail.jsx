import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import { useCart } from "../store/cart";
import { formatCurrency } from "../utils/formatCurrency";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    (async () => {
      const p = await api.getProductById(id);
      setProduct(p);
    })();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <img src={product.images?.[0] || "/placeholder.png"} alt={product.name} className="w-full rounded-xl" />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="text-zinc-400">{product.category}</div>
        <div className="text-xl font-bold mt-2">{formatCurrency(product.price)}</div>
        <p className="mt-4">{product.description || "No description."}</p>
        <button onClick={() => addItem(product, 1)} className="mt-6 px-4 py-2 rounded bg-blue-600 hover:bg-blue-500">
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}
