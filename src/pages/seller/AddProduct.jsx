import { useState } from "react";
import { useProducts } from "../../store/products";

export default function AddProduct() {
  const { addProduct } = useProducts();
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sellerId = 1; //
    const newProduct = {
      ...form,
      id: `local-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
      sellerId,
    };
    addProduct(newProduct);
    setForm({ name: "", price: "", stock: "", image: "", description: "" });
  };


  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-gray-200 dark:border-zinc-700">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        Tambah Produk Baru
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          placeholder="Nama Produk"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Harga"
            value={form.price}
            onChange={handleChange}
            className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stok"
            value={form.stock}
            onChange={handleChange}
            className="p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-zinc-800 dark:border-zinc-700"
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Deskripsi Produk"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-zinc-800 dark:border-zinc-700 resize-none"
          rows={4}
        />

        <div>
          <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
            Upload Foto Produk
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded-xl dark:bg-zinc-800 dark:border-zinc-700"
          />
          {form.image && (
            <div className="mt-4 flex justify-center">
              <img
                src={form.image}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-2xl border shadow-md"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg transition-transform transform hover:scale-105"
        >
          Tambah Produk
        </button>
      </form>
    </div>
  );
}
