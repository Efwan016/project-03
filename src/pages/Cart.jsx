import { useCart } from "../store/cart";
import { formatCurrency } from "../utils/formatCurrency";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, total, updateQty, removeItem } = useCart();

  if (!items.length) return <div>Keranjang kosong. <Link className="underline" to="/products">Belanja sekarang</Link></div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Keranjang</h1>
      {items.map(it => (
        <div key={it.id} className="flex items-center justify-between border border-zinc-800 rounded p-3">
          <div className="flex items-center gap-3">
            <img
              src={it.images?.[0] || "/placeholder.png"}
              alt={it.name || "Product image"}
              className="w-16 h-16 object-cover rounded"
            />
            <div>
              <div className="font-medium">{it.name}</div>
              <div className="text-sm text-zinc-400">{formatCurrency(it.price)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => updateQty(it.id, Math.max(1, it.qty - 1))} className="px-2 rounded bg-zinc-800">-</button>
            <span>{it.qty}</span>
            <button onClick={() => updateQty(it.id, it.qty + 1)} className="px-2 rounded bg-zinc-800">+</button>
            <button onClick={() => removeItem(it.id)} className="ml-3 px-3 py-1 rounded bg-red-600">Hapus</button>
          </div>
        </div>
      ))}
      <div className="text-right font-bold">Total: {formatCurrency(total)}</div>
      <div className="text-right">
        <Link to="/checkout" className="inline-block mt-2 px-4 py-2 rounded bg-green-600 hover:bg-green-500">Checkout</Link>
      </div>
    </div>
  );
}
