
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { SidebarProvider } from "@/components/ui/sidebar";
import { CartProvider } from "@/contexts/CartContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import ProductCatalog from "@/pages/ProductCatalog";
import Cart from "@/pages/Cart";
import Orders from "@/pages/Orders";
import Customers from "@/pages/Customers";
import GRN from "@/pages/GRN";
import Inventory from "@/pages/Inventory";
import Warranty from "@/pages/Warranty";
import Reports from "@/pages/Reports";
import Invoices from "@/pages/Invoices";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import "./App.css";

console.info("App component rendering");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <SidebarProvider>
            <CartProvider>
              <DashboardLayout />
            </CartProvider>
          </SidebarProvider>
        }>
          <Route index element={<Dashboard />} />
          <Route path="catalog" element={<ProductCatalog />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="grn" element={<GRN />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="warranty" element={<Warranty />} />
          <Route path="reports" element={<Reports />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
