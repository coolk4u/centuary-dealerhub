
const products = [
  {
    name: "Ortho Plus Mattress",
    sales: 45,
    revenue: "₹2,25,000",
    growth: "+15%",
  },
  {
    name: "Memory Foam Deluxe",
    sales: 32,
    revenue: "₹1,92,000",
    growth: "+8%",
  },
  {
    name: "Spring Classic",
    sales: 28,
    revenue: "₹1,40,000",
    growth: "+12%",
  },
  {
    name: "Premium Pillow Set",
    sales: 56,
    revenue: "₹84,000",
    growth: "+22%",
  },
];

export function TopProducts() {
  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div key={product.name} className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
            {index + 1}
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm font-medium">{product.revenue}</p>
            <p className="text-xs text-green-600">{product.growth}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
