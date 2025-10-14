// MainNavbar.tsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navbarItems } from "./MainNavbarContent";
import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

const MainNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { cartItems, toggleCart } = useCart();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = (itemName: string) => {
    setActiveDropdown(activeDropdown === itemName ? null : itemName);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-gray-800 cursor-pointer" onClick={()=>navigate("/")}>Hotel Logo</div>

          {/* Desktop Navbar */}
          <ul className="hidden md:flex items-center space-x-6">
            {navbarItems.map((item) => (
              <li key={item.name} className="relative">
                {item.dropdown ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => toggleDropdown(item.name)}
                      className={`flex items-center space-x-2 cursor-pointer ${
                        location.pathname.startsWith('/orders') && item.name === 'Profile'
                          ? "text-blue-600 border-b-2 border-blue-600"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {item.icon && <item.icon size={20} />}
                      <span>{item.name}</span>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} 
                      />
                    </button>
                    
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                        <ul className="py-1">
                          {item.dropdown.items.map((dropdownItem) => (
                            <li key={dropdownItem.name}>
                              <Link
                                to={dropdownItem.link}
                                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {dropdownItem.icon && <dropdownItem.icon size={16} />}
                                <span>{dropdownItem.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.link || "/"}
                    className={`flex items-center space-x-2 cursor-pointer ${
                      location.pathname === item.link
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {item.icon && <item.icon size={20} />}
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
            <li>
              <button onClick={toggleCart} className="relative">
                <FaShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </li>
          </ul>

          {/* Mobile Navbar Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleCart} className="relative mr-4">
              <FaShoppingCart size={24} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button 
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <ul className="pt-2 pb-4 space-y-2">
              {navbarItems.map((item) => (
                <li key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.name)}
                        className={`flex items-center justify-between w-full px-4 py-2 text-sm ${location.pathname.startsWith('/orders') && item.name === 'Profile'
                          ? "text-blue-600 bg-blue-50"
                          : "text-gray-600 hover:bg-gray-50"
                          }`}
                      >
                        <div className="flex items-center space-x-2">
                          {item.icon && <item.icon size={20} />}
                          <span>{item.name}</span>
                        </div>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {activeDropdown === item.name && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {item.dropdown.items.map((dropdownItem) => (
                            <li key={dropdownItem.name}>
                              <Link
                                to={dropdownItem.link}
                                onClick={() => {
                                  setActiveDropdown(null);
                                  toggleMenu();
                                }}
                                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                              >
                                {dropdownItem.icon && <dropdownItem.icon size={16} />}
                                <span>{dropdownItem.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.link || "/"}
                      onClick={toggleMenu}
                      className={`flex items-center space-x-2 px-4 py-2 text-sm ${location.pathname === item.link
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      {item.icon && <item.icon size={20} />}
                      <span>{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;