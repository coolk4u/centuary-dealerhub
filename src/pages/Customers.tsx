
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Edit, MapPin, Phone, Plus } from "lucide-react";
import { CustomerEditDialog } from "@/components/customers/CustomerEditDialog";

const customers = [
  {
    id: "CUST-001",
    name: "Dream Sleep Center",
    email: "contact@dreamsleep.com",
    phone: "+91 98765 43210",
    status: "active",
    type: "Premium",
    billingAddress: {
      street: "123 MG Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      country: "India"
    },
    shippingAddress: {
      street: "123 MG Road",
      city: "Mumbai", 
      state: "Maharashtra",
      pincode: "400001",
      country: "India"
    },
    lastOrder: "2024-01-15"
  },
  {
    id: "CUST-002",
    name: "Comfort Zone Mattress",
    email: "info@comfortzone.com",
    phone: "+91 98765 43211",
    status: "active",
    type: "Standard",
    billingAddress: {
      street: "456 Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110001", 
      country: "India"
    },
    shippingAddress: {
      street: "789 Karol Bagh",
      city: "New Delhi",
      state: "Delhi", 
      pincode: "110005",
      country: "India"
    },
    lastOrder: "2024-01-12"
  },
  {
    id: "CUST-003",
    name: "Sleep Well Showroom",
    email: "sales@sleepwell.com", 
    phone: "+91 98765 43212",
    status: "active",
    type: "Premium",
    billingAddress: {
      street: "789 Brigade Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India"
    },
    shippingAddress: {
      street: "789 Brigade Road", 
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      country: "India"
    },
    lastOrder: "2024-01-10"
  }
];

const Customers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    return status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  const getTypeColor = (type: string) => {
    return type === "Premium" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800";
  };

  const handleEditCustomer = (customer: typeof customers[0]) => {
    setSelectedCustomer(customer);
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">
            Manage your retailer customers and their details.
          </p>
        </div>
        <Button className="portal-gradient text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Filters */}
      <Card className="portal-card">
        <CardHeader>
          <CardTitle>Filter Customers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="portal-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{customer.name}</CardTitle>
                  <CardDescription>{customer.id}</CardDescription>
                </div>
                <div className="flex flex-col space-y-1">
                  <Badge className={getStatusColor(customer.status)}>
                    {customer.status}
                  </Badge>
                  <Badge className={getTypeColor(customer.type)}>
                    {customer.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {customer.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {customer.billingAddress.city}, {customer.billingAddress.state}
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500 mb-3">
                  Last order: {new Date(customer.lastOrder).toLocaleDateString()}
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleEditCustomer(customer)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CustomerEditDialog 
        customer={selectedCustomer}
        isOpen={isEditDialogOpen}
        onClose={() => {
          setIsEditDialogOpen(false);
          setSelectedCustomer(null);
        }}
      />
    </div>
  );
};

export default Customers;
