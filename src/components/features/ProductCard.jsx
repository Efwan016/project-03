import { Link } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

export default function ProductCard({ p }) {
  const imgSrc = p.image || p.images?.[0] || "/placeholder.png";
  return (
    <div className="rounded-xl border border-zinc-800 p-3 bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
      <Link to={`/product/${p.id}`}>
        <img src={imgSrc} alt={p.name} className="w-full h-40 object-cover rounded-lg mb-3" />
        <div className="font-medium">{p.name}</div>
        <div className="text-sm ">{p.category}</div>
        <div className="mt-2 font-bold">{formatCurrency(p.price)}</div>
      </Link>
    </div>
  );
}
