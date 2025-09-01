import { useQuery } from '@tanstack/react-query';
import api from '../config/api';


export type ServiceTemplateType = {
  id: string;
  name: string;
  description: string;
  link: string;
  image: string;
}

interface GetServiceTemplatesResponse {
  data: ServiceTemplateType[];

  total: number;
  page: number;
  limit: number;
}

interface GetServiceTemplatesParams {
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  page?: number;
  search?: string;
}

const getServiceTemplates = async (params: GetServiceTemplatesParams): Promise<GetServiceTemplatesResponse> => {
  const { data } = await api.get<GetServiceTemplatesResponse>('/service-templates', { params });
  return data;
};

export const useGetServiceTemplates = (params: GetServiceTemplatesParams) => {
  return useQuery({
    queryKey: ['service-templates', params],
    queryFn: () => getServiceTemplates(params),
  });
};

export const useGetServiceTemplatesNoParams = () => {
  return useQuery({
    queryKey: ['service-templates-no-params'],
    queryFn: () => getServiceTemplates({}),

  });
};