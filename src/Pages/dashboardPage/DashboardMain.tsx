import React, { useState, useMemo } from 'react';
import DashboardCard from '../../components/DashboardCard/DashboardCard';
import Pagination from '../../components/common/Pagination';
import ServiceFilter from '../../components/common/ServiceFilter';

import { useGetServiceTemplates } from '../../hooks/useGetServiceTemplate';

const DashboardMain: React.FC = () => {
  const { data: templateData } = useGetServiceTemplates({
    sortOrder: 'asc',
    limit: 8,
    page: 1,
    search: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const itemsPerPage = 8;

  const filteredAndSortedServices = useMemo(() => {
    if (!templateData || !templateData.data) {
      return [];
    }

    let services = [...templateData.data];

    // Filter
    if (searchTerm) {
      services = services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort
    services.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    return services;
  }, [templateData, searchTerm, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedServices.length / itemsPerPage);
  const currentServices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedServices.slice(startIndex, endIndex);
  }, [filteredAndSortedServices, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (search: string) => {
    setSearchTerm(search);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleSortChange = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    setCurrentPage(1); // Reset to first page on new sort
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ServiceFilter onSearch={handleSearch} onSortChange={handleSortChange} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentServices.map((service, index) => (
          <DashboardCard
            key={index}
            name={service.name}
            description={service.description}
            link={service.link}
            image={service.image}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DashboardMain;