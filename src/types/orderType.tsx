export interface OrderProduct {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  product: {
    name: string;
    id: string;
    price: number;
  };
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface Hotel {
  id: string;
  name: string;
  address: string;
  rating: number;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  userId: string;
  hotelId: string;
  status: string;
  hidden: boolean;
  total: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  hotel: Hotel;
  OrderProduct: OrderProduct[];
}

export interface OrdersResponse {
  data: Order[];
}
