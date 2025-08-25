import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, Users, Package, FileText, Home, Store } from "lucide-react";

export default function AdminLayout() {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* SIDEBAR */}
      <aside
        className={`${
          open ? "w-64" : "w-16"
        } bg-white dark:bg-zinc-900 shadow-md h-screen sticky top-0 transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4">
          {open && (
            <h2 className="font-bold text-xl transition-all duration-300">
              Admin
            </h2>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <Menu size={24} />
          </button>
        </div>

        <br/><br/>

        <nav className="p-2 space-y-16 flex flex-col">
          <Link
            to="/admin"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <Home size={28} />
            {open && <span>Dashboard</span>}
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <Users size={28} />
            {open && <span>Manage Users</span>}
          </Link>
          <Link
            to="/admin/stores"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <Store size={28} />
            {open && <span>Manage Store</span>}
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <Package size={28} />
            {open && <span>Manage Products</span>}
          </Link>
          <Link
            to="/admin/reports"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <FileText size={28} />
            {open && <span>Reports</span>}
          </Link>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        {/* CONTENT */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
