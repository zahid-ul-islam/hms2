import { useQuery } from '@tanstack/react-query';
import api from '../config/api';
import { Product } from '../types/productType';


interface GetProductsResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

interface GetProductParams {
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  page?: number;
  search?: string;
  categoryId?: string;
  serviceId?: string;
}

const getProducts = async (params: GetProductParams): Promise<GetProductsResponse> => {
  const { data } = await api.get<GetProductsResponse>('/products', { params });

  return data;
};

export const useGetProducts = (params: GetProductParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
  });
};