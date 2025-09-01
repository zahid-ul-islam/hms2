import { useQuery } from '@tanstack/react-query';
import api from '../config/api';


export type Category = {
  id: string;
  name: string;
  images: string[];
  serviceId:string;
  hotelId:string
}

interface GetCategoriesResponse {
  data: Category[];
  total: number;
  page: number;
  limit: number;
}

interface GetServiceTemplatesParams {
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  page?: number;
  search?: string;
  serviceId?: string;
}

const getCategories = async (params: GetServiceTemplatesParams): Promise<GetCategoriesResponse> => {
  const { data } = await api.get<GetCategoriesResponse>('/categories', { params });
  return data;
};

export const useGetCategoryTemplates = (params: GetServiceTemplatesParams) => {
  return useQuery({
    queryKey: ['categories', params],
    queryFn: () => getCategories(params),
  });
};