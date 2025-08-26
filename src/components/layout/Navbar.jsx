import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useCart } from "../../store/cart";
import { FaShoppingCart } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const cartStore = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [showNotif, setShowNotif] = useState(false);
  const notifications = [
    { id: 1, message: "New order received" },
    { id: 2, message: "Payment confirmed" },
  ];

  // pisahin ref desktop & mobile
  const notifRefDesktop = useRef(null);
  const notifRefMobile = useRef(null);

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

  const orderCount = user?.role === "seller" ? 5 : 0;

  // handle klik di luar notif
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (notifRefDesktop.current && notifRefDesktop.current.contains(e.target)) ||
        (notifRefMobile.current && notifRefMobile.current.contains(e.target))
      ) {
        return; // kalau klik di dalam notif, jangan nutup
      }
      setShowNotif(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="border-b border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">

        {/* logo */}
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

          {user?.role === "user" && (
            <NavLink to="/cart" className="flex items-center gap-1">
              <FaShoppingCart /> ({cartStore.totalQty()})
            </NavLink>
          )}

          {user?.role === "seller" && (
            <NavLink to="/seller-orders" className="flex items-center gap-1">
              📦 Orders ({orderCount})
            </NavLink>
          )}

          {/* tombol notif desktop */}
          {user && (
            <div className="relative" ref={notifRefDesktop}>
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="px-3 py-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white relative"
              >
                🔔
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded shadow-lg z-50">
                  {notifications.length === 0 ? (
                    <div className="p-2 text-gray-500">No notifications</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="p-2 border-b border-gray-100 dark:border-zinc-700">
                        {n.message}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {!user ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white"
            >
              Logout
            </button>
          )}
        </nav>

        {/* mobile: dark mode + notif + hamburger */}
        <div className="md:hidden flex items-center gap-2">

          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
          >
            {isDark ? "🌙" : "☀️"}
          </button>

          {user && (
            <div className="relative" ref={notifRefMobile}>
              <button
                onClick={() => setShowNotif(!showNotif)}
                className="px-3 py-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white relative"
              >
                🔔
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotif && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded shadow-lg z-50">
                  {notifications.length === 0 ? (
                    <div className="p-2 text-gray-500">No notifications</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="p-2 border-b border-gray-100 dark:border-zinc-700">
                        {n.message}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

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
          
          {!user ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <button
              onClick={() => { logout(); navigate("/"); setMenuOpen(false); }}
              className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
}
