import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductCard({ p }) {
  return (
    <div className="rounded-xl border border-zinc-800 p-3 bg-zinc-900">
      <Link to={`/product/${p.id}`}>
        <img src={p.images?.[0] || "/placeholder.png"} alt={p.name} className="w-full h-40 object-cover rounded-lg mb-3" />
        <div className="font-medium">{p.name}</div>
        <div className="text-sm text-zinc-400">{p.category}</div>
        <div className="mt-2 font-bold">{formatCurrency(p.price)}</div>
      </Link>
    </div>
  );
}
