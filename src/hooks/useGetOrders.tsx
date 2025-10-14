import { useState, useEffect, useRef } from 'react';
import api from '../config/api';
import { cred } from '../cred';
import { OrdersResponse } from '../types/orderType';

export const useGetOrders = () => {
  const [orders, setOrders] = useState<OrdersResponse['data']>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchOrders = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      setError(null);
      
      const response = await api.get<OrdersResponse>(
        `/orders/hotel/${cred.user.hotelId}/customer/${cred.user.id}`,
        {
          headers: {
            'Authorization': `Bearer ${cred.access_token}`
          }
        }
      );
      
      setOrders(response.data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchOrders();

    // Set up auto-refresh every 30 seconds
    intervalRef.current = setInterval(() => {
      fetchOrders(false); // Don't show loading spinner for auto-refresh
    }, 30000);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Function to manually refetch (with loading spinner)
  const refetch = () => {
    fetchOrders(true);
  };

  return {
    orders,
    loading,
    error,
    refetch
  };
};
