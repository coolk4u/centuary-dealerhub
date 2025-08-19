
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
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your dealership.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      {/* Charts and Data */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 portal-card">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>
              Your sales performance over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SalesChart />
          </CardContent>
        </Card>

        <Card className="col-span-3 portal-card">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>
              Best selling mattresses this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TopProducts />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="portal-card">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Latest orders from your customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrders />
          </CardContent>
        </Card>

        <Card className="portal-card">
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>
              Important updates and reminders
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">Low Stock Alert</p>
                <p className="text-xs text-gray-600">5 products running low on inventory</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm font-medium">Target Achieved</p>
                <p className="text-xs text-gray-600">Monthly sales target completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
