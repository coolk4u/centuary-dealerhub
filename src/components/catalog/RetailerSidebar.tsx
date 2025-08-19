
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Store, MapPin, Phone, X } from "lucide-react";

const retailers = [
  {
    id: "RET-001",
    name: "Dream Sleep Center",
    location: "Mumbai, Maharashtra",
    phone: "+91 98765 43210",
    status: "active",
    type: "Premium",
    lastOrder: "2024-01-10"
  },
  {
    id: "RET-002", 
    name: "Comfort Zone Mattress",
    location: "Delhi, NCR",
    phone: "+91 98765 43211",
    status: "active",
    type: "Standard",
    lastOrder: "2024-01-08"
  },
  {
    id: "RET-003",
    name: "Sleep Well Showroom", 
    location: "Bangalore, Karnataka",
    phone: "+91 98765 43212",
    status: "active",
    type: "Premium",
    lastOrder: "2024-01-05"
  },
  {
    id: "RET-004",
    name: "Rest Easy Furniture",
    location: "Pune, Maharashtra", 
    phone: "+91 98765 43213",
    status: "inactive",
    type: "Standard",
    lastOrder: "2023-12-20"
  },
  {
    id: "RET-005",
    name: "Mattress World",
    location: "Chennai, Tamil Nadu",
    phone: "+91 98765 43214", 
    status: "active",
    type: "Premium",
    lastOrder: "2024-01-12"
  },
  {
    id: "RET-006",
    name: "Sweet Dreams Store",
    location: "Hyderabad, Telangana",
    phone: "+91 98765 43215",
    status: "active", 
    type: "Standard",
    lastOrder: "2024-01-09"
  }
];

interface RetailerSidebarProps {
  selectedRetailer: string;
  onRetailerSelect: (retailer: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export function RetailerSidebar({ selectedRetailer, onRetailerSelect, isOpen, onToggle }: RetailerSidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  console.log("RetailerSidebar rendered - isOpen:", isOpen);

  const filteredRetailers = retailers.filter(retailer => {
    const matchesSearch = retailer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         retailer.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || retailer.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600";
  };

  const getTypeColor = (type: string) => {
    return type === "Premium" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800";
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full shadow-lg">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Select Retailer</h3>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search retailers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              variant={filterStatus === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("all")}
            >
              All
            </Button>
            <Button
              variant={filterStatus === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("active")}
            >
              Active
            </Button>
            <Button
              variant={filterStatus === "inactive" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStatus("inactive")}
            >
              Inactive
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-3">
        {filteredRetailers.map((retailer) => (
          <Card 
            key={retailer.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedRetailer === retailer.name ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => {
              console.log("Retailer clicked:", retailer.name);
              onRetailerSelect(retailer.name);
            }}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-2">
                  <Store className="w-4 h-4 mt-1 text-gray-500" />
                  <div>
                    <CardTitle className="text-sm">{retailer.name}</CardTitle>
                    <p className="text-xs text-gray-500">{retailer.id}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-1">
                  <Badge className={getStatusColor(retailer.status)} variant="secondary">
                    {retailer.status}
                  </Badge>
                  <Badge className={getTypeColor(retailer.type)} variant="secondary">
                    {retailer.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-2">
              <div className="flex items-center text-xs text-gray-600">
                <MapPin className="w-3 h-3 mr-1" />
                {retailer.location}
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Phone className="w-3 h-3 mr-1" />
                {retailer.phone}
              </div>
              <p className="text-xs text-gray-500">
                Last order: {new Date(retailer.lastOrder).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedRetailer && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Selected:</p>
              <p className="text-xs text-gray-600">{selectedRetailer}</p>
            </div>
            <Button size="sm" variant="outline" onClick={() => onRetailerSelect("")}>
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
