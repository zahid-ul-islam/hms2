import { useQuery } from '@tanstack/react-query';
import api from '../config/api';

export type Category = {
  id: string;
  name: string;
  images: string[];
  serviceId: string;
  hotelId: string;
};

interface GetCategoriesResponse {
  data: Category[];
  total: number;
  page: number;
  limit: number;
}

interface GetCategoryTemplatesParams {
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  page?: number;
  search?: string;
  serviceId?: string;
}

const getCategories = async (params: GetCategoryTemplatesParams): Promise<GetCategoriesResponse> => {
  const { data } = await api.get<GetCategoriesResponse>('/categories', { params });
  return data;
};

export const useGetCategoryTemplates = (params: GetCategoryTemplatesParams) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => getCategories(params),
  });
};





