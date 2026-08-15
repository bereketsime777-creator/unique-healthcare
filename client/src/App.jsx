import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import MyOrders from "./pages/MyOrders";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Services from "./pages/Services";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";

import AdminLayout from "./admin/components/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import EditProduct from "./admin/EditProduct";
import ManageOrders from "./admin/ManageOrders";
import OrderDetails from "./admin/OrderDetails";
import Messages from "./admin/Messages";

// Scroll to top on every navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function Layout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isAuth = ["/login", "/register", "/forgot-password"].includes(location.pathname)
    || location.pathname.startsWith("/reset-password");

  return (
    <>
      <ScrollToTop />
      {!isAdmin && !isAuth && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/refund" element={<RefundPolicy />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          <Route path="orders" element={<ManageOrders />} />
          <Route path="orders/:id" element={<OrderDetails />} />
          <Route path="messages" element={<Messages />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
              <p style={{ fontSize: "96px", fontWeight: 900, color: "#e2e8f0", margin: "0 0 16px" }}>404</p>
              <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#374151", margin: "0 0 8px" }}>Page Not Found</h1>
              <p style={{ color: "#94a3b8", marginBottom: "28px" }}>The page you are looking for doesn&apos;t exist.</p>
              <a href="/" style={{ background: "#2563eb", color: "#fff", padding: "12px 28px", borderRadius: "12px", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}>
                Back to Home
              </a>
            </div>
          }
        />
      </Routes>

      {!isAdmin && !isAuth && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
