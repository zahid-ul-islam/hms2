import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { cred } from '../cred';
import api from '../config/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface CartItem {
  _id: string;
  cartItemId: string; // Unique ID for each item in the cart
  name: string;
  price: number;
  image: string;
  quantity: number;
  hotelId: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity' | 'cartItemId'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  placeOrder: () => void;
  cartTotal: number;
  isCartOpen: boolean;
  toggleCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const addToCart = (item: Omit<CartItem, 'quantity' | 'cartItemId'>) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((prevItem) => prevItem._id === item._id);

      if (existingItem) {
        return prevItems.map((prevItem) =>
          prevItem._id === item._id
            ? { ...prevItem, quantity: prevItem.quantity + 1 }
            : prevItem
        );
      } else {
        const newItem: CartItem = {
          ...item,
          quantity: 1,
          cartItemId: `${item._id}-${Date.now()}`,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const orderData = {
      userId: cred.user.id,
      hotelId: cartItems[0].hotelId,
      orderProducts: cartItems.map(item => ({
        productId: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      status: "pending",
      total: cartTotal
    };

    try {
      await api.post('/orders', orderData);
      setCartItems([]);
      toast.success('Order placed successfully!');
    } catch (error) {
      console.error('Failed to place order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        placeOrder,
        cartTotal,
        isCartOpen,
        toggleCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};