
const orders = [
  {
    id: "ORD-001",
    customer: "ABC Furniture Store",
    product: "Ortho Plus Mattress",
    amount: "₹25,000",
    status: "pending",
  },
  {
    id: "ORD-002", 
    customer: "Sleep Well Showroom",
    product: "Premium Pillow Set",
    amount: "₹12,500",
    status: "approved",
  },
  {
    id: "ORD-003",
    customer: "Comfort Zone",
    product: "Luxury Memory Foam",
    amount: "₹45,000",
    status: "dispatched",
  },
  {
    id: "ORD-004",
    customer: "Dream Home Furnishing",
    product: "Spring Classic",
    amount: "₹18,750",
    status: "delivered",
  },
];

export function RecentOrders() {
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center justify-between p-3 portal-surface">
          <div className="space-y-1">
            <p className="text-sm font-medium">{order.customer}</p>
            <p className="text-xs text-muted-foreground">{order.product}</p>
            <p className="text-xs text-muted-foreground">#{order.id}</p>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm font-medium">{order.amount}</p>
            <span className={`status-badge ${order.status}`}>
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
