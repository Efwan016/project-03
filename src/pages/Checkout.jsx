import { useState } from "react";
import { useCart } from "../store/cart";
import { useAuth } from "../store/auth";
import { formatCurrency } from "../utils/formatCurrency";
import api from "../api";


function Checkout() {
  const { user } = useAuth();
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    PaymentMethod: "Cash On Delivery",
  });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!items.length) return;
    await api.createOrder({
      userId: user.id, 
      items,
      total,
      address: form.address,
      paymentMethod: form.paymentMethod,
    });

    setSubmitted(true);
    clear();
  };

  if (!items.length && !submitted)
    return <div>Keranjang kosong. Tambahkan produk dulu.</div>;

  if (submitted)
    return (
      <div className="text-center mt-10">
        <h1 className="text-2xl font-bold mb-4">Terima kasih atas pesananmu!</h1>
        <p>Total pembayaran: <strong>{formatCurrency(total)}</strong></p>
        <p>Pesanan akan dikirim ke: {form.address}, {form.city}, {form.postalCode}</p>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Nama</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-zinc-800 rounded px-3 py-2 bg-zinc-900"
          />
        </div>
        <div>
          <label className="block mb-1">Alamat</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border border-zinc-800 rounded px-3 py-2 bg-zinc-900"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Kota</label>
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              required
              className="w-full border border-zinc-800 rounded px-3 py-2 bg-zinc-900"
            />
          </div>
          <div>
            <label className="block mb-1">Kode Pos</label>
            <input
              type="text"
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              required
              className="w-full border border-zinc-800 rounded px-3 py-2 bg-zinc-900"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Metode Pembayaran</label>
          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full border border-zinc-800 rounded px-3 py-2 bg-zinc-900" >
            <option value="cod">Cash on Delivery</option>
            <option value="bank">Transfer Bank (Dummy)</option>
            <option value="card">Kartu Kredit (Dummy)</option>
          </select>
        </div>
        <button type="submit"
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-500"> Bayar {formatCurrency(total)}
        </button>
      </form>
    </div>
  )
};
export default Checkout;