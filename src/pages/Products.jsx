import { useProducts } from "../store/products";
import ProductCard from "../components/features/ProductCard";

export default function Products() {
  const { products } = useProducts();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
