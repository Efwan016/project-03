import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useProducts } from "../store/products"; 
import ProductCard from "../components/features/ProductCard";
import "../css/layout.css";

export default function Home() {
  const { user } = useAuth();
  const { products } = useProducts();

  return (
    <div className="home-container">
      <h1>🛒 Adzani E-Commerce</h1>

      {/* --- User Section --- */}
      {user ? (
        <>
          <p>
            Halo, <b>{user.username}</b>! (Role: {user.role})
          </p>
          <p>Selamat datang kembali di Adzani Market!</p>

          {user.role === "admin" && (
            <Link to="/admin" className="btn">Ke Admin Panel</Link>
          )}
          {user.role === "seller" && (
            <Link to="/seller" className="btn">Kelola Produk</Link>
          )}
          {user.role === "user" && (
            <Link to="/profile" className="btn">Lihat Profil</Link>
          )}
        </>
      ) : (
        <>
          <p>Silakan login untuk mulai berbelanja atau mengelola produk.</p>
          <div className="btn-group">
            <Link to="/login" className="btn">Login</Link>
            <Link to="/register" className="btn">Register</Link>
          </div>
        </>
      )}

      {/* --- Hero Section --- */}
      <section className="hero">
        <h2>Belanja Hemat, Hidup Nikmat!</h2>
        <p>Dapatkan diskon hingga 50% untuk produk pilihan minggu ini 🚀</p>
        <Link to="/products" className="btn">Mulai Belanja</Link>
      </section>

      {/* --- Categories Section --- */}
      <section className="section">
        <h2>Kategori Populer</h2>
        <div className="grid">
          <div className="card">👕 Fashion</div>
          <div className="card">📱 Elektronik</div>
          <div className="card">⌚ Aksesoris</div>
          <div className="card">👟 Sepatu</div>
        </div>
      </section>

      {/* --- Featured Products --- */}
      <section className="section">
        <h2>Produk Terlaris</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* --- Promo Banner --- */}
      <section className="promo">
        <h2>🔥 Promo Spesial Minggu Ini!</h2>
        <p>Beli 2 Gratis 1 untuk kategori Fashion</p>
        <Link to="/products" className="btn">Cek Promo</Link>
      </section>
    </div>
  );
}
