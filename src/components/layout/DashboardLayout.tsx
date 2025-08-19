
import { Outlet } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { HeaderNav } from "@/components/layout/HeaderNav";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 w-full flex">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Centuary Dealer Portal</h1>
            </div>
          </div>
          <HeaderNav />
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
