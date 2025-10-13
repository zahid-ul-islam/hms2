import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { CartProvider } from '../context/CartContext';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="categories/[serviceId]" options={{ title: 'Categories' }} />
          {/* Product page already handled by /product */}
        </Stack>
        <Toast />
      </CartProvider>
    </QueryClientProvider>
  );
}
