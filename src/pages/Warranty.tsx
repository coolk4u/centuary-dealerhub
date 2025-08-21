
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Shield, Plus, Search } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const customers = [
  { id: "CUST-001", name: "Dream Sleep Center" },
  { id: "CUST-002", name: "Comfort Zone Mattress" },
  { id: "CUST-003", name: "Sleep Well Showroom" },
];

const products = [
  { id: "PROD-001", name: "Centuary Ortho Plus Mattress", model: "OP-001", warranty: "10 years" },
  { id: "PROD-002", name: "Centuary Memory Foam Mattress", model: "MF-002", warranty: "7 years" },
  { id: "PROD-003", name: "Centuary Spring Mattress", model: "SP-003", warranty: "5 years" },
];

const registeredWarranties = [
  {
    id: "WAR-001",
    customer: "Dream Sleep Center",
    product: "Centuary Ortho Plus Mattress",
    model: "OP-001",
    serialNumber: "SN001234567",
    purchaseDate: "2024-01-15",
    warrantyPeriod: "10 years",
    status: "active"
  },
  {
    id: "WAR-002", 
    customer: "Comfort Zone Mattress",
    product: "Centuary Memory Foam Mattress",
    model: "MF-002",
    serialNumber: "SN001234568",
    purchaseDate: "2024-01-10",
    warrantyPeriod: "7 years",
    status: "active"
  }
];

const Warranty = () => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState<Date>();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredWarranties = registeredWarranties.filter(warranty =>
    warranty.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warranty.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warranty.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRegisterWarranty = () => {
    if (!selectedCustomer || !selectedProduct || !serialNumber || !purchaseDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log("Registering warranty:", {
      customer: selectedCustomer,
      product: selectedProduct,
      serialNumber,
      purchaseDate: format(purchaseDate, "yyyy-MM-dd")
    });

    toast({
      title: "Warranty Registered",
      description: "Product warranty has been successfully registered.",
    });

    // Reset form
    setSelectedCustomer("");
    setSelectedProduct("");
    setSerialNumber("");
    setPurchaseDate(undefined);
  };

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Warranty Registration</h2>
          <p className="text-muted-foreground">
            Register products for warranty and manage warranty records.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Registration Form */}
        <Card className="portal-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Register New Warranty
            </CardTitle>
            <CardDescription>
              Select customer, product and enter details to register warranty.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer *</Label>
              <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.name}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="product">Product *</Label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.name}>
                      {product.name} ({product.model})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedProduct && (
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>Warranty Period:</strong>{" "}
                  {products.find(p => p.name === selectedProduct)?.warranty}
                </p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="serial">Serial Number *</Label>
              <Input
                id="serial"
                placeholder="Enter product serial number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Purchase Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !purchaseDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {purchaseDate ? format(purchaseDate, "PPP") : "Select purchase date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={purchaseDate}
                    onSelect={setPurchaseDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button onClick={handleRegisterWarranty} className="w-full portal-gradient text-white">
              <Plus className="w-4 h-4 mr-2" />
              Register Warranty
            </Button>
          </CardContent>
        </Card>

        {/* Warranty Records */}
        <Card className="portal-card">
          <CardHeader>
            <CardTitle>Registered Warranties</CardTitle>
            <CardDescription>
              View and manage existing warranty registrations.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search warranties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredWarranties.map((warranty) => (
                <div key={warranty.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{warranty.product}</p>
                      <p className="text-xs text-muted-foreground">{warranty.customer}</p>
                    </div>
                    <Badge className={getStatusColor(warranty.status)}>
                      {warranty.status}
                    </Badge>
                  </div>
                  <div className="text-xs space-y-1">
                    <p><strong>Serial:</strong> {warranty.serialNumber}</p>
                    <p><strong>Purchase:</strong> {new Date(warranty.purchaseDate).toLocaleDateString()}</p>
                    <p><strong>Warranty:</strong> {warranty.warrantyPeriod}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Warranty;
