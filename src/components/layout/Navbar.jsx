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
  const [search, setSearch] = useState("");

  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [showNotif, setShowNotif] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifRefDesktop = useRef(null);
  const notifRefMobile = useRef(null);

  // ==== Theme init ====
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

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    }
  };

  // ==== Build notifications per akun & role ====
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    const notifList = [];

    // Safely parse LS
    const allOrders = (() => {
      try {
        return JSON.parse(localStorage.getItem("orders")) || [];
      } catch {
        return [];
      }
    })();

    const allCarts = (() => {
      try {
        return JSON.parse(localStorage.getItem("carts")) || [];
      } catch {
        return [];
      }
    })();

    const now = new Date();

    if (user.role === "user") {
      // Unpaid carts milik user ini
      const unpaid = allCarts.filter(
        (c) => c.userId === user.id && c.status === "Unpaid"
      );
      unpaid.forEach((c) => {
        notifList.push({
          id: `unpaid-${c.id}`,
          type: "Unpaid",
          message: `💸 Order #${c.id} belum dibayar`,
          target: "/cart",
        });
      });

      // Status order milik user ini
      allOrders
        .filter((o) => o.userId === user.id)
        .forEach((o) => {
          const start = o.startDate ? new Date(o.startDate) : null;
          const end = o.endDate ? new Date(o.endDate) : null;

          if (o.status === "Pending") {
            notifList.push({
              id: `pending-${o.id}`,
              type: "Pending",
              message: `🕒 Order #${o.id} menunggu konfirmasi`,
              target: "/orders",
            });
          } else if (
            o.status === "Approved" &&
            start &&
            end &&
            start <= now &&
            end >= now
          ) {
            notifList.push({
              id: `active-${o.id}`,
              type: "Active",
              message: `🟢 Order #${o.id} sedang diproses`,
              target: "/orders",
            });
          } else if (o.status === "Shipped") {
            notifList.push({
              id: `shipped-${o.id}`,
              type: "Shipped",
              message: `🚚 Order #${o.id} sedang dikirim`,
              target: "/orders",
            });
          } else if (o.status === "Delivered") {
            notifList.push({
              id: `delivered-${o.id}`,
              type: "Delivered",
              message: `📦 Order #${o.id} sudah sampai`,
              target: "/orders",
            });
          }
        });
    } else if (user.role === "seller") {
      // Order baru masuk ke seller ini
      allOrders
        .filter((o) => o.sellerId === user.id && o.status === "Pending")
        .forEach((o) => {
          notifList.push({
            id: `new-${o.id}`,
            type: "NewOrder",
            message: `📦 Order #${o.id} dari ${o.buyerName || "customer"} menunggu konfirmasi`,
            target: "/seller-orders",
          });
        });

      // Order paid / siap kirim
      allOrders
        .filter((o) => o.sellerId === user.id && o.status === "Approved")
        .forEach((o) => {
          notifList.push({
            id: `paid-${o.id}`,
            type: "Paid",
            message: `💸 Order #${o.id} sudah dibayar, siap dikirim`,
            target: "/seller-orders",
          });
        });
    } else if (user.role === "admin") {
      // Contoh notif admin
      notifList.push({
        id: "report-1",
        type: "Report",
        message: "⚠️ Ada laporan baru dari pengguna",
        target: "/admin/reports",
      });
    }

    setNotifications(notifList);
    // simpan per akun (opsional, untuk caching / debug)
    localStorage.setItem(`notifs_${user.id}`, JSON.stringify(notifList));
  }, [user]);

  // ==== Click outside to close notif ====
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        (notifRefDesktop.current &&
          notifRefDesktop.current.contains(e.target)) ||
        (notifRefMobile.current && notifRefMobile.current.contains(e.target))
      ) {
        return;
      }
      setShowNotif(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ==== Derived counts ====
  const sellerPendingCount = (() => {
    if (!user || user.role !== "seller") return 0;
    try {
      const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
      return allOrders.filter(
        (o) => o.sellerId === user.id && o.status === "Pending"
      ).length;
    } catch {
      return 0;
    }
  })();

  // ==== Notif Dropdown ====
  const NotifDropdown = ({ mobile = false }) => (
    <div
      className={`absolute ${mobile ? "left-0" : "right-0"
        } mt-2 w-72 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded shadow-lg z-50`}
    >
      {notifications.length === 0 ? (
        <div className="p-3 text-gray-500">No notifications</div>
      ) : (
        <ul className="max-h-80 overflow-auto">
          {notifications.map((notif) => (
            <li
              key={notif.id}
              onClick={() => {
                setShowNotif(false);
                if (notif.target) navigate(notif.target);
              }}
              className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-700 cursor-pointer flex justify-between items-center"
            >
              <div className="pr-2">{notif.message}</div>
              <span className="text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-gray-300 dark:bg-gray-600">
                {notif.type}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <header className="border-b border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl">
          Adzani Market
        </Link>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-4">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white"
          />
        </form>
        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-4 items-center">
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
            aria-label="Toggle dark mode"
          >
            {isDark ? "🌙" : "☀️"}
          </button>

          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            Products
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) => (isActive ? "underline" : "")}
          >
            History
          </NavLink>

          {user?.role === "user" && (
            <NavLink to="/cart" className="flex items-center gap-1">
              <FaShoppingCart /> ({cartStore.totalQty()})
            </NavLink>
          )}

          {user?.role === "seller" && (
            <NavLink to="/seller-orders" className="flex items-center gap-1">
              📦 Orders ({sellerPendingCount})
            </NavLink>
          )}

          {user?.role === "user" && (
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "underline" : "")}
            >
              Profile
            </NavLink>
          )}

          {/* Notif Desktop */}
          {user && (
            <div className="relative" ref={notifRefDesktop}>
              <button
                onClick={() => setShowNotif((s) => !s)}
                className="px-3 py-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white relative"
                aria-label="Open notifications"
              >
                🔔
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotif && <NotifDropdown />}
            </div>
          )}

          {!user ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setNotifications([]);
                navigate("/");
              }}
              className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-white"
            >
              Logout
            </button>
          )}
        </nav>

        {/* MOBILE: dark mode + notif (kiri) + cart/seller + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
            aria-label="Toggle dark mode"
          >
            {isDark ? "🌙" : "☀️"}
          </button>

          {user && (
            <div className="relative" ref={notifRefMobile}>
              <button
                onClick={() => setShowNotif((s) => !s)}
                className="px-3 py-1 rounded bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white relative"
                aria-label="Open notifications"
              >
                🔔
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs px-1">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotif && <NotifDropdown mobile />}
            </div>
          )}

          {/* Cart (user) */}
          {user?.role === "user" && (
            <NavLink to="/cart" className="flex items-center gap-2">
              <FaShoppingCart /> ({cartStore.totalQty()})
            </NavLink>
          )}

          {/* Seller orders shortcut (mobile) */}
          {user?.role === "seller" && (
            <NavLink to="/seller-orders" className="flex items-center gap-1">
              📦 ({sellerPendingCount})
            </NavLink>
          )}

          <button onClick={() => setMenuOpen((m) => !m)} aria-label="Open menu">
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <nav className="md:hidden flex flex-col gap-4 p-4 border-t border-gray-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/orders">History</NavLink>

          {!user ? (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setNotifications([]);
                setMenuOpen(false);
                navigate("/");
              }}
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
