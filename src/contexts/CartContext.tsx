
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: number;
  name: string;
  dealerPrice: string;
  quantity: number;
  image: string;
  retailer: string;
  category: string;
  size: string;
  scheme?: {
    inScheme: boolean;
    bulkDiscount?: {
      minQuantity: number;
      discountPercent: number;
      message: string;
    } | null;
  };
}

interface Retailer {
  id: string;
  name: string;
  location: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface CartContextType {
  cart: CartItem[];
  selectedRetailer: string;
  selectedRetailerDetails: Retailer | null;
  setSelectedRetailer: (retailer: string) => void;
  addToCart: (product: any, quantity?: number) => void;
  updateCartQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalAmount: () => number;
}

const retailers: Retailer[] = [
  {
    id: "RET-001",
    name: "Dream Sleep Center",
    location: "Mumbai, Maharashtra",
    phone: "+91 98765 43210",
    address: "Shop No. 15, Dream Plaza, Linking Road",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050"
  },
  {
    id: "RET-002", 
    name: "Comfort Zone Mattress",
    location: "Delhi, NCR",
    phone: "+91 98765 43211",
    address: "B-24, Connaught Place",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110001"
  },
  {
    id: "RET-003",
    name: "Sleep Well Showroom", 
    location: "Bangalore, Karnataka",
    phone: "+91 98765 43212",
    address: "456, MG Road, Brigade Road Junction",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001"
  }
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedRetailer, setSelectedRetailerState] = useState("");

  const selectedRetailerDetails = selectedRetailer 
    ? retailers.find(r => r.name === selectedRetailer) || null
    : null;

  const setSelectedRetailer = (retailer: string) => {
    setSelectedRetailerState(retailer);
  };

  const addToCart = (product: any, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity, retailer: selectedRetailer }];
      }
    });
  };

  const updateCartQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.dealerPrice.replace(/[₹,]/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      selectedRetailer,
      selectedRetailerDetails,
      setSelectedRetailer,
      addToCart,
      updateCartQuantity,
      clearCart,
      getTotalItems,
      getTotalAmount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
