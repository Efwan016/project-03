import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useProducts } from "../store/products";
import { useCart } from "../store/cart";
import api from "../api";
import { formatCurrency } from "../utils/formatCurrency";
import { toast } from "react-toastify";
import ProductCard from "../components/features/ProductCard";
import ProductSkeleton from "../components/layout/ProductSkeleton";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, refresh } = useProducts();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCart((s) => s.addItem);

  const [displayCount, setDisplayCount] = useState(4);
  const increment = 4;

  useEffect(() => {
    (async () => {
      setLoading(true);
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
      setLoading(false);
    })();
  }, [id, products, refresh]);

  const handleAddToCart = () => {
    addItem(product, 1);
    toast.success(`🛒 ${product.name} berhasil ditambahkan ke keranjang!`);
  };

  const recommendedProducts = products.filter((p) => String(p.id) !== id);

  const loadMore = useCallback(() => {
    setDisplayCount((prev) => Math.min(prev + increment, recommendedProducts.length));
  }, [recommendedProducts.length]);

  const sentinelRef = useInfiniteScroll(loadMore, displayCount < recommendedProducts.length);

  if (loading) return <ProductSkeleton count={1} />;
  if (!product) return <div className="text-center mt-10 text-gray-500">Produk tidak ditemukan.</div>;

  const productImage =
    product?.image || (Array.isArray(product?.images) && product.images[0]) || "/placeholder.png";

  return (
    <div className="space-y-10 p-6">
      {/* Detail Produk */}
      <div className="grid gap-6 md:grid-cols-2">
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
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium"
            >
              Tambah ke Keranjang
            </button>

            <button
              onClick={() => window.location.href = "/checkout"}
              className="px-4 py-2 rounded bg-green-600 hover:bg-green-500 text-white font-medium"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Rekomendasi Produk */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Rekomendasi Untukmu</h2>

        {recommendedProducts.length === 0 ? (
          <p className="text-gray-500">Belum ada rekomendasi.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedProducts.slice(0, displayCount).map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
        <div ref={sentinelRef} className="h-4" />
      </div>
    </div>
  );
}
