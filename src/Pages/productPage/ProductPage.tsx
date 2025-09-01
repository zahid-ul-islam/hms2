import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/common/ProductCard';
import { useGetProducts } from '../../hooks/useGetProduct';
import Pagination from '../../components/common/Pagination';

const ProductPage: React.FC = () => {
  const { categoryId, serviceId } = useParams<{ categoryId: string; serviceId: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const { data: products, isLoading, isError } = useGetProducts({ categoryId, serviceId, page: currentPage, limit: itemsPerPage });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !products) {
    return <div>Error fetching products</div>;
  }

  const totalPages = Math.ceil(products.total / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.data.map((product) => (
          <ProductCard key={product.id} product={product} />
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

export default ProductPage;
