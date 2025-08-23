import React, { useEffect, useState } from "react";

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(savedUsers);
  }, []);

  const saveUsers = (updatedUsers) => {
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const toggleBan = (id) => {
    const updatedUsers = users.map((u) =>
      u.id === id ? { ...u, banned: !u.banned } : u
    );
    saveUsers(updatedUsers);
  };
  
  const filteredUsers = users.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === "all" ? true : u.role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">👤 Manage Users</h2>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-4">
        <input
         type="text"
          placeholder="Search Users..."
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
          className="border p-2 rounded
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
          transition-all"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border bg-white dark:bg-zinc-900">
        <thead className="bg-gray-200 dark:bg-zinc-800">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <tr key={u.id}>
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border">
                  {u.banned ? (
                    <span className="text-red-500 font-semibold">Banned</span>
                  ) : (
                    <span className="text-green-500 font-semibold">Active</span>
                  )}
                </td>
                <td className="p-2 border">
                  <button
                    onClick={() => toggleBan(u.id)}
                    className={`px-3 py-1 rounded text-white ${
                      u.banned ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {u.banned ? "Unban" : "Ban"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUser;