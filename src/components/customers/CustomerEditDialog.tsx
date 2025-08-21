
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  type: string;
  billingAddress: Address;
  shippingAddress: Address;
  lastOrder: string;
}

interface CustomerEditDialogProps {
  customer: Customer | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CustomerEditDialog({ customer, isOpen, onClose }: CustomerEditDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Customer | null>(null);

  useEffect(() => {
    if (customer) {
      setFormData({ ...customer });
    }
  }, [customer]);

  const handleSave = () => {
    if (formData) {
      console.log("Saving customer data:", formData);
      toast({
        title: "Customer Updated",
        description: "Customer details have been successfully updated.",
      });
      onClose();
    }
  };

  const updateFormData = (field: string, value: string) => {
    if (formData) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const updateAddress = (addressType: 'billingAddress' | 'shippingAddress', field: string, value: string) => {
    if (formData) {
      setFormData({
        ...formData,
        [addressType]: {
          ...formData[addressType],
          [field]: value
        }
      });
    }
  };

  const copyBillingToShipping = () => {
    if (formData) {
      setFormData({
        ...formData,
        shippingAddress: { ...formData.billingAddress }
      });
    }
  };

  if (!formData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Customer Details</DialogTitle>
          <DialogDescription>
            Update customer information and addresses.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="billing">Billing Address</TabsTrigger>
            <TabsTrigger value="shipping">Shipping Address</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Customer Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Customer Type</Label>
                    <Input
                      id="type"
                      value={formData.type}
                      onChange={(e) => updateFormData('type', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="billing-street">Street Address</Label>
                  <Input
                    id="billing-street"
                    value={formData.billingAddress.street}
                    onChange={(e) => updateAddress('billingAddress', 'street', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="billing-city">City</Label>
                    <Input
                      id="billing-city"
                      value={formData.billingAddress.city}
                      onChange={(e) => updateAddress('billingAddress', 'city', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-state">State</Label>
                    <Input
                      id="billing-state"
                      value={formData.billingAddress.state}
                      onChange={(e) => updateAddress('billingAddress', 'state', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-pincode">Pincode</Label>
                    <Input
                      id="billing-pincode"
                      value={formData.billingAddress.pincode}
                      onChange={(e) => updateAddress('billingAddress', 'pincode', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="billing-country">Country</Label>
                    <Input
                      id="billing-country"
                      value={formData.billingAddress.country}
                      onChange={(e) => updateAddress('billingAddress', 'country', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Shipping Address</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyBillingToShipping}
                  >
                    Copy from Billing
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shipping-street">Street Address</Label>
                  <Input
                    id="shipping-street"
                    value={formData.shippingAddress.street}
                    onChange={(e) => updateAddress('shippingAddress', 'street', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="shipping-city">City</Label>
                    <Input
                      id="shipping-city"
                      value={formData.shippingAddress.city}
                      onChange={(e) => updateAddress('shippingAddress', 'city', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping-state">State</Label>
                    <Input
                      id="shipping-state"
                      value={formData.shippingAddress.state}
                      onChange={(e) => updateAddress('shippingAddress', 'state', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping-pincode">Pincode</Label>
                    <Input
                      id="shipping-pincode"
                      value={formData.shippingAddress.pincode}
                      onChange={(e) => updateAddress('shippingAddress', 'pincode', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping-country">Country</Label>
                    <Input
                      id="shipping-country"
                      value={formData.shippingAddress.country}
                      onChange={(e) => updateAddress('shippingAddress', 'country', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="portal-gradient text-white">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
