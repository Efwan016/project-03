import { useCallback, useEffect, useState } from "react";
import { useProducts } from "../store/products";
import api from "../api";
import ProductSkeleton from "../components/layout/ProductSkeleton";
import ProductCard from "../components/features/ProductCard";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export default function Products() {
  const { products: localProducts, refresh } = useProducts();
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [displayCount,setDisplayCount] = useState(0);
  const increment = 4

  useEffect(() => {
    (async () => {
      setLoading(true);

      if (localProducts.length === 0) await refresh();

      // fetch produk dari API / JSON
      try {
        const res = await api.getProducts();
        setApiProducts(res || []);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [localProducts, refresh]);

  // merge dan pastikan key unik
  const allProducts = [
    ...apiProducts.map(p => ({ ...p, id: String(p.id), _key: `api-${p.id}` })),
    ...localProducts.map(p => ({ ...p, id: String(p.id), _key: `local-${p.id}` }))
  ];

  const uniqueProducts = allProducts.filter(
    (p, index, self) => self.findIndex(x => x.id === p.id) === index
  );

  const loadMore = useCallback(() => {
    setDisplayCount(prev => Math.min(prev + increment, uniqueProducts.length));
  },[uniqueProducts.length]);

  const sentinelRef = useInfiniteScroll(loadMore, displayCount < uniqueProducts.length);

  return (
     <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 p-6">
    <h1 className="text-2xl font-bold mb-6">Products</h1>

    {loading ? (
      <ProductSkeleton count={8} />
    ) : allProducts.length === 0 ? (
      <p className="text-gray-500">Belum ada produk.</p>
    ) : (

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {uniqueProducts.map((p) => (
          <ProductCard key={p._key} p={p} />
        ))}
      </div>
    )}

    <div ref={sentinelRef} className="h-4" />
  </div>
  );
}
