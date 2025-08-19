
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", sales: 245000 },
  { name: "Feb", sales: 289000 },
  { name: "Mar", sales: 312000 },
  { name: "Apr", sales: 278000 },
  { name: "May", sales: 356000 },
  { name: "Jun", sales: 445000 },
];

export function SalesChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="name" 
            className="text-xs fill-muted-foreground"
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            className="text-xs fill-muted-foreground"
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
          />
          <Bar 
            dataKey="sales" 
            className="fill-primary" 
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
