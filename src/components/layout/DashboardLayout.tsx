
import { Outlet } from "react-router-dom";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { HeaderNav } from "@/components/layout/HeaderNav";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50/50 flex w-full">
      <AppSidebar />
      <div className="flex-1 flex flex-col w-full min-w-0">
        <header className="bg-white border-b border-gray-200 px-3 sm:px-4 lg:px-6 py-3 flex items-center justify-between w-full shrink-0">
          <div className="flex items-center space-x-2 sm:space-x-4 min-w-0">
            <SidebarTrigger />
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Centuary Dealer Portal</h1>
            </div>
          </div>
          <HeaderNav />
        </header>
        <main className="flex-1 w-full overflow-auto bg-slate-50/50">
          <div className="h-full w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
