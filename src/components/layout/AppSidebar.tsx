
import { LayoutDashboard, Package, ShoppingCart, Warehouse, BarChart3, FileText, Target, Settings, Building2, ClipboardCheck, Users, Shield, User, ShoppingBag } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";

const menuItems = [{
  title: "Dashboard",
  url: "/",
  icon: LayoutDashboard
}, {
  title: "Product Catalog",
  url: "/catalog",
  icon: Package
}, {
  title: "Shopping Cart",
  url: "/cart",
  icon: ShoppingCart
}, {
  title: "Orders",
  url: "/orders",
  icon: ShoppingBag
}, {
  title: "Customers",
  url: "/customers",
  icon: Users
}, {
  title: "GRN Process",
  url: "/grn",
  icon: ClipboardCheck
}, {
  title: "Inventory",
  url: "/inventory",
  icon: Warehouse
}, {
  title: "Warranty Registration",
  url: "/warranty",
  icon: Shield
}, {
  title: "Reports",
  url: "/reports",
  icon: BarChart3
}, {
  title: "Invoices",
  url: "/invoices",
  icon: FileText
}, {
  title: "Profile",
  url: "/profile",
  icon: User
}, {
  title: "Settings",
  url: "/settings",
  icon: Settings
}];

export function AppSidebar() {
  const {
    state
  } = useSidebar();
  const location = useLocation();
  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    return path !== "/" && location.pathname.startsWith(path);
  };
  return <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="portal-sidebar border-r-0 bg-gradient-to-b from-blue-600 via-purple-600 to-purple-700">
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 w-8 h-8 rounded-lg flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            {!isCollapsed && <div>
                <h2 className="font-bold text-white">Centuary</h2>
                <p className="text-xs text-white/70">Dealer Portal</p>
              </div>}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-white/60 text-xs uppercase tracking-wider">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={`sidebar-item ${isActive(item.url) ? 'active' : ''}`}>
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}
