import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Report = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const savedTransactions =
      JSON.parse(localStorage.getItem("transactions")) || [];

    setProducts(savedProducts);
    setUsers(savedUsers);
    setTransactions(savedTransactions);
    setFiltered(savedTransactions);
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    const start = new Date(e.target.start.value);
    const end = new Date(e.target.end.value);

    const filteredTx = transactions.filter((tx) => {
      const date = new Date(tx.date);
      return date >= start && date <= end;
    });

    setFiltered(filteredTx);
  };

  const exportCSV = () => {
    const rows = filtered.map((tx) =>
      [tx.id, tx.user, tx.product, tx.amount, tx.date].join(",")
    );
    const csvContent =
      "data:text/csv;charset=utf-8," +
      ["ID,User,Product,Amount,Date", ...rows].join("\n");
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "report.csv";
    link.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction Report", 14, 10);
    doc.autoTable({
      head: [["ID", "User", "Product", "Amount", "Date"]],
      body: filtered.map((tx) => [
        tx.id,
        tx.user,
        tx.product,
        tx.amount,
        tx.date,
      ]),
    });
    doc.save("report.pdf");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📊 Reports</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className=" dark:bg-zinc-800 p-2 rounded shadow hover:shadow-md transition">
          <h3 className="font-semibold text-gray-700 text-lg">Products</h3>
          <p className="text-2xl font-bold dark:text-gray-100">{products.length}</p>
        </div>

        <div className=" dark:bg-zinc-800 p-2 rounded shadow hover:shadow-md transition">
          <h3 className="font-semibold text-gray-700 text-lg">Users</h3>
          <p className="text-2xl font-bold dark:text-gray-100">{users.length}</p>
        </div>

        <div className=" dark:bg-zinc-800 p-2 rounded shadow hover:shadow-md transition">
          <h3 className="font-semibold text-gray-700 text-lg">Transactions</h3>
          <p className="text-2xl font-bold dark:text-gray-100">{transactions.length}</p>
        </div>
      </div>


      {/* Filter Form */}
      <form onSubmit={handleFilter} className="flex gap-4 mb-4">
        <input type="date" name="start"  className="border p-2 rounded
          border-gray-300 
          focus:border-blue-500
          focus:ring-2 
          focus:ring-blue-200 
          bg-white 
          dark:bg-zinc-800
          text-gray-800 
          dark:text-gray-100 
          placeholder-gray-400 
          outline-none 
          transition-all" />
        <input type="date" name="end"  className="border p-2 rounded
          border-gray-300 
          focus:border-blue-500
          focus:ring-2 
          focus:ring-blue-200 
          bg-white 
          dark:bg-zinc-800
          text-gray-800 
          dark:text-gray-100 
          placeholder-gray-400 
          outline-none 
          transition-all" />
        <button  className="border p-2 rounded
          border-gray-300 
          focus:border-blue-500
          focus:ring-2 
          focus:ring-blue-200 
          bg-white 
          dark:bg-zinc-800
          text-gray-800 
          dark:text-gray-100 
          placeholder-gray-400 
          outline-none 
          transition-all">
          Filter
        </button>
      </form>

      {/* Table */}
      <table className="w-full border bg-white dark:bg-zinc-900">
        <thead className="bg-gray-200 dark:bg-zinc-800">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((tx) => (
              <tr key={tx.id}>
                <td className="p-2 border">{tx.id}</td>
                <td className="p-2 border">{tx.user}</td>
                <td className="p-2 border">{tx.product}</td>
                <td className="p-2 border">${tx.amount}</td>
                <td className="p-2 border">{tx.date}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Export Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={exportCSV}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export CSV
        </button>
        <button
          onClick={exportPDF}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
};

export default Report;