import { useEffect, useState } from "react";
import { useProducts } from "../store/products";
import api from "../api";
import ProductCard from "../components/features/ProductCard";

export default function Products() {
  const { products: localProducts, refresh } = useProducts();
  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    (async () => {
      // refresh localProducts kalau kosong
      if (localProducts.length === 0) await refresh();

      // fetch produk dari API / JSON
      try {
        const res = await api.getProducts();
        setApiProducts(res || []);
      } catch (err) {
        console.error("Error loading products:", err);
      }
    })();
  }, [localProducts, refresh]);

  // merge dan pastikan key unik
  const allProducts = [
    ...apiProducts.map(p => ({ ...p, id: String(p.id), _key: `api-${p.id}` })),
    ...localProducts.map(p => ({ ...p, id: String(p.id), _key: `local-${p.id}` }))
  ];

  // optional: filter duplicate (misal kalau ada local dan api yang sama)
  const uniqueProducts = allProducts.filter(
    (p, index, self) => self.findIndex(x => x.id === p.id) === index
  );


  return (
     <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      {allProducts.length === 0 ? (
        <p className="text-gray-500">Belum ada produk.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uniqueProducts.map(p => (
            <ProductCard key={p._key} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
