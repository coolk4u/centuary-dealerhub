
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

interface FilterSidebarProps {
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  onClose: () => void;
}

export function FilterSidebar({ priceRange, onPriceRangeChange, onClose }: FilterSidebarProps) {
  return (
    <Card className="w-80 h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-3">Price Range</h4>
          <div className="space-y-3">
            <Slider
              value={priceRange}
              onValueChange={onPriceRangeChange}
              max={50000}
              min={0}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>₹{priceRange[0].toLocaleString()}</span>
              <span>₹{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Availability */}
        <div>
          <h4 className="font-medium mb-3">Availability</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="in-stock" />
              <label htmlFor="in-stock" className="text-sm">In Stock</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="out-stock" />
              <label htmlFor="out-stock" className="text-sm">Out of Stock</label>
            </div>
          </div>
        </div>

        {/* Product Type */}
        <div>
          <h4 className="font-medium mb-3">Product Type</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="mattress" />
              <label htmlFor="mattress" className="text-sm">Mattress</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pillow" />
              <label htmlFor="pillow" className="text-sm">Pillow</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="accessories" />
              <label htmlFor="accessories" className="text-sm">Accessories</label>
            </div>
          </div>
        </div>

        {/* Size */}
        <div>
          <h4 className="font-medium mb-3">Size</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="single" />
              <label htmlFor="single" className="text-sm">Single</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="double" />
              <label htmlFor="double" className="text-sm">Double</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="queen" />
              <label htmlFor="queen" className="text-sm">Queen</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="king" />
              <label htmlFor="king" className="text-sm">King</label>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
