
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";

// Pages
import Login from "./pages/Login";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProductCatalog from "./pages/ProductCatalog";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import GRN from "./pages/GRN";
import Inventory from "./pages/Inventory";
import Warranty from "./pages/Warranty";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  console.log("App component rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={
              <SidebarProvider>
                <DashboardLayout />
              </SidebarProvider>
            }>
              <Route index element={<Dashboard />} />
              <Route path="catalog" element={<ProductCatalog />} />
              <Route path="orders" element={<Orders />} />
              <Route path="customers" element={<Customers />} />
              <Route path="grn" element={<GRN />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="warranty" element={<Warranty />} />
              <Route path="reports" element={<Reports />} />
              <Route path="targets" element={<Navigate to="/" replace />} />
              <Route path="invoices" element={<Navigate to="/" replace />} />
              <Route path="settings" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
