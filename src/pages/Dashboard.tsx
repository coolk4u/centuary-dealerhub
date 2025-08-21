
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SalesChart } from "@/components/dashboard/SalesChart";
import { RecentOrders } from "@/components/dashboard/RecentOrders";
import { TopProducts } from "@/components/dashboard/TopProducts";
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Target,
  AlertCircle,
  CheckCircle
} from "lucide-react";

const Dashboard = () => {
  const metrics = [
    {
      title: "Monthly Sales",
      value: "₹12.45L",
      change: "+12.3%",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "vs last month"
    },
    {
      title: "Orders Pending",
      value: "23",
      change: "-5.2%",
      changeType: "positive" as const,
      icon: ShoppingCart,
      description: "awaiting approval"
    },
    {
      title: "Stock Value",
      value: "₹8.67L",
      change: "+2.1%",
      changeType: "positive" as const,
      icon: Package,
      description: "current inventory"
    },
    {
      title: "Target Achievement",
      value: "87.5%",
      change: "+15.2%",
      changeType: "positive" as const,
      icon: Target,
      description: "this quarter"
    }
  ];

  return (
    <div className="w-full h-full p-2 sm:p-4 lg:p-6 space-y-4 sm:space-y-6 overflow-auto">
      <div className="px-1">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm sm:text-base text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your dealership.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-1">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts and Data */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-7 px-1">
        <Card className="col-span-1 lg:col-span-4 portal-card">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Sales Overview</CardTitle>
            <CardDescription className="text-sm">
              Your sales performance over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <SalesChart />
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3 portal-card">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Top Products</CardTitle>
            <CardDescription className="text-sm">
              Best selling mattresses this month
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <TopProducts />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 px-1">
        <Card className="portal-card">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Recent Orders</CardTitle>
            <CardDescription className="text-sm">
              Latest orders from your customers
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <RecentOrders />
          </CardContent>
        </Card>

        <Card className="portal-card">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-base sm:text-lg">Alerts & Notifications</CardTitle>
            <CardDescription className="text-sm">
              Important updates and reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 space-y-3 sm:space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium">Low Stock Alert</p>
                <p className="text-xs text-gray-600 break-words">5 products running low on inventory</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium">Target Achieved</p>
                <p className="text-xs text-gray-600 break-words">Monthly sales target completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
