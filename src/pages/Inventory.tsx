
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Package, TrendingUp, TrendingDown } from "lucide-react";

const inventory = [
  {
    id: 1,
    product: "Ortho Plus Mattress",
    category: "Mattress",
    currentStock: 45,
    minimumStock: 10,
    reorderLevel: 20,
    value: "₹8,43,750",
    movement: "fast",
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    product: "Memory Foam Deluxe",
    category: "Mattress",
    currentStock: 8,
    minimumStock: 15,
    reorderLevel: 25,
    value: "₹2,10,000",
    movement: "slow",
    lastUpdated: "2024-01-14"
  },
  {
    id: 3,
    product: "Premium Pillow Set",
    category: "Pillow",
    currentStock: 0,
    minimumStock: 25,
    reorderLevel: 50,
    value: "₹0",
    movement: "out_of_stock",
    lastUpdated: "2024-01-10"
  },
  {
    id: 4,
    product: "Spring Classic",
    category: "Mattress",
    currentStock: 32,
    minimumStock: 12,
    reorderLevel: 20,
    value: "₹4,32,000",
    movement: "moderate",
    lastUpdated: "2024-01-15"
  },
];

const Inventory = () => {
  const totalValue = inventory.reduce((sum, item) => {
    const value = parseInt(item.value.replace(/[₹,]/g, ''));
    return sum + value;
  }, 0);

  const lowStockItems = inventory.filter(item => 
    item.currentStock <= item.minimumStock || item.currentStock === 0
  ).length;

  const getStockStatus = (item: any) => {
    if (item.currentStock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (item.currentStock <= item.minimumStock) return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    if (item.currentStock <= item.reorderLevel) return { label: "Reorder Soon", color: "bg-orange-100 text-orange-800" };
    return { label: "In Stock", color: "bg-green-100 text-green-800" };
  };

  const getMovementIcon = (movement: string) => {
    switch (movement) {
      case 'fast': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'slow': return <TrendingDown className="w-4 h-4 text-red-600" />;
      case 'out_of_stock': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Package className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Inventory Management</h2>
        <p className="text-muted-foreground">
          Track your stock levels and manage inventory efficiently.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="portal-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Inventory Value</p>
                <p className="text-2xl font-bold">₹{(totalValue / 100000).toFixed(2)}L</p>
              </div>
              <Package className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="portal-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Products in Stock</p>
                <p className="text-2xl font-bold">{inventory.length}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="portal-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-red-600">{lowStockItems}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="portal-card">
        <CardHeader>
          <CardTitle>Stock Overview</CardTitle>
          <CardDescription>
            Current stock levels and movement trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Min. Stock</th>
                  <th>Status</th>
                  <th>Movement</th>
                  <th>Value</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item) => {
                  const status = getStockStatus(item);
                  return (
                    <tr key={item.id}>
                      <td className="font-medium">{item.product}</td>
                      <td>{item.category}</td>
                      <td>{item.currentStock} units</td>
                      <td>{item.minimumStock} units</td>
                      <td>
                        <Badge className={status.color}>
                          {status.label}
                        </Badge>
                      </td>
                      <td>
                        <div className="flex items-center space-x-2">
                          {getMovementIcon(item.movement)}
                          <span className="capitalize text-sm">{item.movement.replace('_', ' ')}</span>
                        </div>
                      </td>
                      <td className="font-medium">{item.value}</td>
                      <td>{new Date(item.lastUpdated).toLocaleDateString()}</td>
                      <td>
                        <Button size="sm" variant="outline">
                          Update Stock
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Inventory;
