import React, { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { cred } from '../cred';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  hotelId?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  placeOrder: (onSuccess?: () => void) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const clearCart = () => setCart([]);

  const placeOrder = async (onSuccess?: () => void) => {
    try {
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const hotelId = cart[0]?.hotelId; // Get hotelId from first item (assuming all items are from same hotel)
      
      // Match the exact API structure
      await axios.post('https://hotel-management-backend-production-2644.up.railway.app/orders', {
        userId: cred.user.id,
        hotelId,
        orderProducts: cart.map(({ id, quantity, price }) => ({ 
          productId: id, 
          quantity, 
          price
        })),
        status: "pending",
        total,
      });
      
      Toast.show({
        type: 'success',
        text1: 'Order Placed!',
        text2: 'Your order has been submitted successfully.',
        position: 'top',
        visibilityTime: 3000,
      });
      
      clearCart();
      
      // Call the success callback to close modal
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 500); // Small delay for better UX
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Order Failed',
        text2: 'Could not place order. Please try again.',
        position: 'top',
        visibilityTime: 4000,
      });
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};
