import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DashboardCardProps } from '../../types/dashboardType';


const DashboardCard: React.FC<DashboardCardProps> = ({ name, description, image, link }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 hover:cursor-pointer"
    onClick={()=>navigate(`/${link}`)}>
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt='card image' 

          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
            <span className="text-sm font-medium text-gray-600">{description}</span>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;