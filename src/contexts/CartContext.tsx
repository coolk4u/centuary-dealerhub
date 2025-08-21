
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

interface CartContextType {
  cart: CartItem[];
  selectedRetailer: string;
  setSelectedRetailer: (retailer: string) => void;
  addToCart: (product: any, quantity?: number) => void;
  updateCartQuantity: (productId: number, newQuantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalAmount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedRetailer, setSelectedRetailer] = useState("");

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
