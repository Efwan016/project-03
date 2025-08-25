import { useState } from "react";
import { useUsers } from "../../store/users";

export default function ManageUsers() {
  const { users, updateUser, deleteUser } = useUsers();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  // Filtering
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter === "all" ? true : u.role === roleFilter;

    return matchSearch && matchRole;
  });

  // Toggle ban/unban
  const toggleBan = (user) => {
    updateUser(user.id, { banned: !user.banned });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👤 Manage Users</h1>

      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-1/2"
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="border border-black dark:border-white p-2 rounded"
        >
          <option value="all">All Roles</option>
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table Users */}
      <table className="w-full border-collapse border border-black dark:border-white p-2">
        <thead>
           <tr className="bg-gray-200 dark:bg-gray-800">
            <th className="border border-black dark:border-white p-2 text-black dark:text-white">#</th>
            <th className="border border-black dark:border-white p-2 text-black dark:text-white">Name</th>
            <th className="border border-black dark:border-white p-2 text-black dark:text-white">Email</th>
            <th className="border border-black dark:border-white p-2 text-black dark:text-white">Role</th>
            <th className="border border-black dark:border-white p-2 text-black dark:text-white">Status</th>
            <th className="border border-black dark:border-white p-2 text-black dark:text-white">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u, i) => (
              <tr key={u.id} className="text-center">
                <td className="border border-black dark:border-white p-2 text-black dark:text-white">{i + 1}</td>
                <td className="border border-black dark:border-white p-2 text-black dark:text-white">{u.name}</td>
                <td className="border border-black dark:border-white p-2 text-black dark:text-white">{u.email}</td>
                <td className="border border-black dark:border-white p-2 text-black dark:text-white capitalize">{u.role}</td>
                <td className="border border-black dark:border-white p-2 text-black dark:text-white">
                  {u.banned ? (
                    <span className="text-red-500 font-semibold">Banned</span>
                  ) : (
                    <span className="text-green-600 font-semibold">Active</span>
                  )}
                </td>
                <td className="border border-black dark:border-white p-2 text-black dark:text-white flex gap-2 justify-center">
                  {u.role !== "admin" && (
                    <button
                      onClick={() => toggleBan(u)}
                      className={`px-3 py-1 rounded ${
                        u.banned
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {u.banned ? "Unban" : "Ban"}
                    </button>
                  )}
                  {u.role !== "admin" && (
                    <button
                      onClick={() => deleteUser(u.id)}
                      className="px-3 py-1 rounded bg-gray-500 text-white"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
