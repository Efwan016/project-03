import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { useCart } from "../../store/cart";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { totalQty } = useCart();

  return (
    <header className="border-b border-zinc-800 bg-zinc-900">
      <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">Adzani Market</Link>

        <nav className="flex gap-4 items-center">
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
            <button onClick={() => { logout(); navigate("/"); }} className="px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700">
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
