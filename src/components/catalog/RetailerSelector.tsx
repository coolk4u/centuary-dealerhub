import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Users, Search, MapPin, Phone, Check } from "lucide-react";

const retailers = [
  {
    id: "RET-001",
    name: "Dream Sleep Center",
    location: "Mumbai, Maharashtra",
    phone: "+91 98765 43210",
    status: "active",
    type: "Premium"
  },
  {
    id: "RET-002", 
    name: "Comfort Zone Mattress",
    location: "Delhi, NCR",
    phone: "+91 98765 43211",
    status: "active",
    type: "Standard"
  },
  {
    id: "RET-003",
    name: "Sleep Well Showroom", 
    location: "Bangalore, Karnataka",
    phone: "+91 98765 43212",
    status: "active",
    type: "Premium"
  },
  {
    id: "RET-004",
    name: "Rest Easy Furniture",
    location: "Pune, Maharashtra", 
    phone: "+91 98765 43213",
    status: "inactive",
    type: "Standard"
  },
  {
    id: "RET-005",
    name: "Mattress World",
    location: "Chennai, Tamil Nadu",
    phone: "+91 98765 43214", 
    status: "active",
    type: "Premium"
  },
  {
    id: "RET-006",
    name: "Sweet Dreams Store",
    location: "Hyderabad, Telangana",
    phone: "+91 98765 43215",
    status: "active", 
    type: "Standard"
  }
];

interface RetailerSelectorProps {
  selectedRetailer: string;
  onRetailerSelect: (retailer: string) => void;
}

export function RetailerSelector({ selectedRetailer, onRetailerSelect }: RetailerSelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRetailers = retailers.filter(retailer =>
    retailer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    retailer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (retailerName: string) => {
    onRetailerSelect(retailerName);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="min-w-[200px] justify-start">
          <Users className="w-4 h-4 mr-2" />
          {selectedRetailer || "Select Retailer"}
          {selectedRetailer && (
            <Check className="w-4 h-4 ml-auto text-green-600" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Select Retailer</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search retailers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="max-h-64 overflow-y-auto space-y-2">
            {filteredRetailers.map((retailer) => (
              <div
                key={retailer.id}
                className={`p-3 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                  selectedRetailer === retailer.name ? 'bg-primary/10 border border-primary/20' : 'border border-transparent'
                }`}
                onClick={() => handleSelect(retailer.name)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{retailer.name}</h4>
                    <p className="text-xs text-gray-500">{retailer.id}</p>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Badge
                      variant="secondary"
                      className={retailer.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                    >
                      {retailer.status}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={retailer.type === "Premium" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}
                    >
                      {retailer.type}
                    </Badge>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-xs text-gray-600">
                    <MapPin className="w-3 h-3 mr-1" />
                    {retailer.location}
                  </div>
                  <div className="flex items-center text-xs text-gray-600">
                    <Phone className="w-3 h-3 mr-1" />
                    {retailer.phone}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
