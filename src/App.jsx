import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPasword";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

import AdminLayout from "./pages/admin/AdminLayout";
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
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { useProducts } from "./store/products";

function App() {
  const { addProduct } = useProducts();

  useEffect(() => {
    api.init?.();
    (async () => {
      const data = await api.getProducts();
      data.forEach(p => addProduct(p));
    })();
  }, [addProduct]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100">
        <Navbar />
        <main className="flex-1 max-w-6xl mx-auto w-full p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
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
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<DashboardAdmin />} />
                <Route path="/admin/users" element={<ManageUsers />} />
                <Route path="/admin/stores" element={<ManageStores />} />
                <Route path="/admin/products" element={<ManageProducts />} />
                <Route path="/admin/reports" element={<Reports />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;
