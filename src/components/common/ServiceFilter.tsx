import React from 'react';

interface ServiceFilterProps {
  onSearch: (search: string) => void;
  onSortChange: (sortOrder: 'asc' | 'desc') => void;
}

const ServiceFilter: React.FC<ServiceFilterProps> = ({ onSearch, onSortChange }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        placeholder="Search services..."
        onChange={e => onSearch(e.target.value)}
        className="px-4 py-2 border rounded-md"
      />
      <select
        onChange={e => onSortChange(e.target.value as 'asc' | 'desc')}
        className="px-4 py-2 border rounded-md"
      >
        <option value="asc">Sort Ascending</option>
        <option value="desc">Sort Descending</option>
      </select>
    </div>
  );
};

export default ServiceFilter;
