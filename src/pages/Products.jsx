import { useCallback, useEffect, useState } from "react";
import { useProducts } from "../store/products";
import api from "../api";
import ProductSkeleton from "../components/layout/ProductSkeleton";
import ProductCard from "../components/features/ProductCard";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useSearchParams } from "react-router-dom";

export default function Products() {
  const { products: localProducts, refresh } = useProducts();
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const increment = 4;
  const [displayCount, setDisplayCount] = useState(increment);

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("search")?.toLowerCase() || "";

  // Fetch API + refresh local products
  useEffect(() => {
    (async () => {
      setLoading(true);

      if (refresh) await refresh(); // refresh produk lokal

      try {
        const res = await api.getProducts(); // fetch API + fallback local
        setApiProducts(res || []);
      } catch (err) {
        console.error("Error loading products:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [refresh]);

  // Merge API + local products, beri key unik
  const allProducts = [
    ...apiProducts.map((p) => ({ ...p, id: String(p.id), _key: `api-${p.id}` })),
    ...localProducts.map((p) => ({ ...p, id: String(p.id), _key: `local-${p.id}` })),
  ];

  // Pastikan ID unik
  const uniqueProducts = allProducts.filter(
    (p, index, self) => self.findIndex((x) => x.id === p.id) === index
  );

  // Filter berdasarkan search keyword
  const filteredProducts = keyword
    ? uniqueProducts.filter((p) => p.name.toLowerCase().includes(keyword))
    : uniqueProducts;

  // Infinite scroll
  const loadMore = useCallback(() => {
    setDisplayCount((prev) => Math.min(prev + increment, filteredProducts.length));
  }, [filteredProducts.length]);

  const sentinelRef = useInfiniteScroll(loadMore, displayCount < filteredProducts.length);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">
        {keyword ? `Search results for "${keyword}"` : "Products"}
      </h1>

      {loading ? (
        <ProductSkeleton count={8} />
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500">Produk "{keyword}" tidak tersedia.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, displayCount).map((p) => (
            <ProductCard key={p._key} p={p} />
          ))}
        </div>
      )}

      <div ref={sentinelRef} className="h-4" />
    </div>
  );
}
