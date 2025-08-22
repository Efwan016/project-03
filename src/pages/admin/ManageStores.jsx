import React, { useEffect, useState } from "react";

const ManageStores = () => {
  const [sellers, setSellers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedSellers = JSON.parse(localStorage.getItem("sellers")) || [];
    setSellers(storedSellers);
  }, []);

  const updateStatus = (id, status) => {
    const updated = sellers.map((seller) =>
      seller.id === id ? { ...seller, status } : seller
    );
    setSellers(updated);
    localStorage.setItem("sellers", JSON.stringify(updated));
  };

  const filteredSellers = sellers.filter((seller) => {
    const matchSearch = seller.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" ? true : seller.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Stores</h1>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search seller..."
          className="
          border 
          border-gray-300 
          focus:border-blue-500 
          focus:ring-2 
          focus:ring-blue-200 
          bg-white 
          dark:bg-zinc-800 
          p-2 rounded-lg 
          w-1/3 text-gray-800 
          dark:text-gray-100 
          placeholder-gray-400 
          outline-none 
          transition-all"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border 
          border-gray-300 
          focus:border-blue-500 
          focus:ring-2 
          focus:ring-blue-200 
          bg-white 
          dark:bg-zinc-800 
          p-2 rounded-lg 
          w-1/3 text-gray-800 
          dark:text-gray-100 
          placeholder-gray-400 
          outline-none 
          transition-all"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Seller List */}
      <table className="w-full border shadow-md rounded-lg overflow-hidden">
        <thead className="border 
          border-gray-300 
          focus:border-blue-500 
          focus:ring-2 
          focus:ring-blue-200 
          bg-white 
          dark:bg-zinc-800 
          p-2 rounded-lg 
          w-1/3 text-gray-800 
          dark:text-gray-100 
          placeholder-gray-400 
          outline-none 
          transition-all">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSellers.length > 0 ? (
            filteredSellers.map((seller) => (
              <tr key={seller.id} className="text-center border-t">
                <td className="p-2">{seller.id}</td>
                <td className="p-2">{seller.name}</td>
                <td className="p-2">{seller.email}</td>
                <td className="p-2 capitalize">{seller.status}</td>
                <td className="p-2 flex justify-center gap-2">
                  {seller.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(seller.id, "approved")}
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(seller.id, "rejected")}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {seller.status === "approved" && (
                    <span className="text-green-600 font-semibold">✅ Approved</span>
                  )}
                  {seller.status === "rejected" && (
                    <span className="text-red-600 font-semibold">❌ Rejected</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-gray-500">
                No sellers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ManageStores;