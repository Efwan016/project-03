import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import DashboardAdmin from "./pages/admin/DashboardAdmin";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageStores from "./pages/admin/ManageStores";
import ManageProducts from "./pages/admin/ManageProducts";
import Reports from "./pages/admin/Reports";

import DashboardSeller from "./pages/seller/DashboardSeller";
import MyProducts from "./pages/seller/MyProducts";
import AddProduct from "./pages/seller/AddProduct";
import EditProduct from "./pages/seller/EditProduct";
import SellerOrders from "./pages/seller/SellerOrders";

import { PrivateRoute, RoleRoute } from "./components/common/RouteGuards";
import api from "./api";
import { useProducts } from "./store/products";

function App() {
  const { setProducts } = useProducts();

  useEffect(() => {
    api.init?.();
    (async () => {
      const data = await api.getProducts();
      setProducts(data);
    })();
  }, [setProducts]);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto w-full p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />

            <Route element={<PrivateRoute />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<Orders />} />
            </Route>

            <Route element={<RoleRoute allow={['seller']} />}>
              <Route path="/seller" element={<DashboardSeller />} />
              <Route path="/seller/products" element={<MyProducts />} />
              <Route path="/seller/products/add" element={<AddProduct />} />
              <Route path="/seller/products/:id/edit" element={<EditProduct />} />
              <Route path="/seller/orders" element={<SellerOrders />} />
            </Route>

            <Route element={<RoleRoute allow={['admin']} />}>
              <Route path="/admin" element={<DashboardAdmin />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/stores" element={<ManageStores />} />
              <Route path="/admin/products" element={<ManageProducts />} />
              <Route path="/admin/reports" element={<Reports />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
