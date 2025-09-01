import React from 'react';
import { Product } from '../../types/productType';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      _id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      hotelId: product.hotelId
    });
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full h-48 object-cover" src={product.images[0]} alt={product.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base h-16 overflow-hidden">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-gray-900 font-bold text-xl">&#x09F3;{product.price}</p>
          <button 
            onClick={handleAddToCart}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
