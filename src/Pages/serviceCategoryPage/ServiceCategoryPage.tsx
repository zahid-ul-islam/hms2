import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetCategoryTemplates } from '../../hooks/useGetCategory';
import CategoryCard from '../../components/common/CategoryCard';
import { ServiceTemplateType, useGetServiceTemplatesNoParams } from '../../hooks/useGetServiceTemplate';
import Pagination from '../../components/common/Pagination';

const ServiceCategoryPage: React.FC = () => {
  const { serviceLink } = useParams<{ serviceLink: string }>();
  const { data: serviceTemplatesData, isLoading: serviceTemplatesLoading } = useGetServiceTemplatesNoParams();
  const [serviceId, setServiceId] = useState<string | undefined>(undefined);
  const [serviceName, setServiceName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    if (serviceTemplatesData && serviceLink) {
      const serviceTemplate = serviceTemplatesData.data.find((st: ServiceTemplateType) => st.link === serviceLink);
      if (serviceTemplate) {
        setServiceId(serviceTemplate.id);
        setServiceName(serviceTemplate.name);
      }
    }
  }, [serviceTemplatesData, serviceLink]);

  const { data: categoriesData, isLoading: categoriesLoading } = useGetCategoryTemplates({ 
    serviceId,
    page: currentPage, 
    limit: itemsPerPage 
  });

  if (categoriesLoading || serviceTemplatesLoading) {
    return <div>Loading categories...</div>;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = categoriesData ? Math.ceil(categoriesData.total / itemsPerPage) : 0;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">{serviceName} Categories</h1>

      {(!categoriesData || categoriesData.data.length === 0) && (
        <p className="text-center text-gray-600">No categories available for {serviceName}.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categoriesData?.data.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            image={category.images[0]}
            categoryId={category.id}
            serviceId={category.serviceId}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default ServiceCategoryPage;
