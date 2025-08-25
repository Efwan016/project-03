import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useCart } from "../../store/cart";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const totalQty = useCart((s) => s.totalQty());
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const root = document.documentElement;

    if (saved === "dark") {
      root.classList.add("dark");
      setIsDark(true);
    } else if (saved === "light") {
      root.classList.remove("dark");
      setIsDark(false);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    root.classList.toggle("dark");
    const dark = root.classList.contains("dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
    setIsDark(dark);
  };

  return (
    <header className="border-b border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">Adzani Market</Link>

        {/* desktop nav */}
        <nav className="hidden md:flex gap-4 items-center">
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
          >
            {isDark ? "🌙" : "☀️"}
          </button>
          <NavLink to="/products" className={({ isActive }) => isActive ? "underline" : ""}>Products</NavLink>
          <NavLink to="/orders" className={({ isActive }) => isActive ? "underline" : ""}>History</NavLink>
          {user?.role === "seller" && <NavLink to="/seller">Seller</NavLink>}
          {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
          <NavLink to="/cart" className="flex items-center gap-1">
            <FaShoppingCart /> ({totalQty})
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700"
            >
              Logout
            </button>
          )}

        </nav>

        {/* mobile hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
          >
            {isDark ? "🌙" : "☀️"}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {menuOpen && (
       <nav className="md:hidden flex flex-col gap-4 p-4 border-t border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/orders">History</NavLink>
          {user?.role === "seller" && <NavLink to="/seller">Seller</NavLink>}
          {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
          <NavLink to="/cart" className="flex items-center gap-1">
            <FaShoppingCart /> ({totalQty})
          </NavLink>

          {!user ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <button
              onClick={() => { logout(); navigate("/"); setMenuOpen(false); }}
              className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
