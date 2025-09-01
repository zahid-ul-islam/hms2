import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  name: string;
  image: string;
  categoryId: string;
  serviceId: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, categoryId, serviceId }) => {
  return (
    <Link to={`/categories/${categoryId}/services/${serviceId}/products`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-32 overflow-hidden">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3">
          <h3 className="text-lg font-semibold text-gray-800 text-center">{name}</h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
