import React, { useRef, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

const Cart: React.FC = () => {
  const { isCartOpen, toggleCart, closeCart, cartItems, removeFromCart, updateQuantity, placeOrder, cartTotal } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, closeCart]);

  return (
    <div
      ref={cartRef}
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={toggleCart} className="text-gray-500 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4 overflow-y-auto h-[calc(100vh-160px)]">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.cartItemId} className="flex items-center mb-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
              <div className="flex-grow">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.price.toFixed(2)} BDT</p>
                <div className="flex items-center mt-2">
                  <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="px-2 py-1 border rounded-md">-</button>
                  <span className="px-4">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="px-2 py-1 border rounded-md">+</button>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.cartItemId)} className="text-red-500 hover:text-red-700">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-lg">Total:</span>
          <span className="font-bold text-lg">{cartTotal.toFixed(2)} BDT</span>
        </div>
        <button 
          onClick={placeOrder} 
          className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 disabled:opacity-50"
          disabled={cartItems.length === 0}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;