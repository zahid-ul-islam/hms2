import React, { useState, useEffect } from 'react';
import { useGetOrders } from '../../hooks/useGetOrders';

const OrdersMain: React.FC = () => {
  const { orders, loading, error, refetch } = useGetOrders();
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isAutoRefreshing, setIsAutoRefreshing] = useState(false);

  // Update last updated time when orders change
  useEffect(() => {
    if (orders.length > 0) {
      setLastUpdated(new Date());
      setIsAutoRefreshing(false);
    }
  }, [orders]);

  // Show auto-refresh indicator briefly
  useEffect(() => {
    if (!loading && !error) {
      setIsAutoRefreshing(true);
      const timer = setTimeout(() => setIsAutoRefreshing(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [orders, loading, error]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-red-600 text-center mb-4">
          <h2 className="text-xl font-semibold">Error loading orders</h2>
          <p>{error}</p>
        </div>
        <button 
          onClick={refetch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-gray-600 text-center">
          <h2 className="text-xl font-semibold mb-2">No orders found</h2>
          <p>You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Orders</h1>
        <div className="flex items-center space-x-4">
          {isAutoRefreshing && (
            <div className="flex items-center space-x-2 text-sm text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Updated</span>
            </div>
          )}
          <button 
            onClick={refetch}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 mb-6">
        Last updated: {lastUpdated.toLocaleTimeString()}
      </div>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6 border">
            {/* Order Header */}
            <div className="flex justify-between items-start mb-4 pb-4 border-b">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Order #{order.id.slice(-8)}
                </h2>
                <p className="text-sm text-gray-600">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  order.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : order.status === 'done'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {order.status === 'pending' ? 'Pending' : order.status === 'done' ? 'Placed' : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-800">
                  Total: ৳{order.total}
                </p>
                <p className="text-sm text-gray-600">
                  {order.OrderProduct.length} item{order.OrderProduct.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>


            {/* Order Items */}
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-3">Order Items</h3>
              <div className="space-y-3">
                {order.OrderProduct.map((item) => (
                  <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.product.name}</h4>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">
                        ৳{item.price} × {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        = ৳{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersMain;
