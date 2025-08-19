
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
  icon: LucideIcon;
  description: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  description
}: MetricCardProps) {
  return (
    <Card className="metric-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="metric-label">{title}</p>
            <p className="metric-value">{value}</p>
          </div>
          <div className="portal-gradient w-12 h-12 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className={`metric-change ${changeType}`}>
            {change}
          </span>
          <span className="text-xs text-muted-foreground">{description}</span>
        </div>
      </CardContent>
    </Card>
  );
}
