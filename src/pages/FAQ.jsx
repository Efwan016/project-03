import { useState } from "react";

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "Bagaimana cara mendaftar sebagai seller?",
      a: "Klik tombol Daftar, pilih peran sebagai Seller, lalu isi form pendaftaran dengan data toko Anda.",
    },
    {
      q: "Bagaimana cara menambahkan produk?",
      a: "Masuk ke halaman 'Produk Saya' di profil seller, lalu klik tombol Tambah Produk.",
    },
    {
      q: "Apakah ada biaya untuk menjadi seller?",
      a: "Saat ini tidak ada biaya, Anda bisa langsung berjualan setelah mendaftar.",
    },
    {
      q: "Bagaimana cara melihat pesanan yang masuk?",
      a: "Pesanan yang masuk akan muncul di dashboard seller pada tab 'Order Saya'.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">❓ Frequently Asked Questions</h1>

      <div className="space-y-4 max-w-2xl">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-lg bg-zinc-100 dark:bg-zinc-800 shadow"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left px-4 py-3 flex justify-between items-center"
            >
              <span className="font-medium">{faq.q}</span>
              <span>{openIndex === index ? "−" : "+"}</span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-gray-600 dark:text-gray-300">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
