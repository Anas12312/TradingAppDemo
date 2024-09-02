import React from 'react';
import { FaPlus, FaCog, FaArrowsAlt, FaTimes } from 'react-icons/fa';

const Header = ({ text }) => {
  return (
    <div className="flex justify-between items-center p-2 bg-gray-800 text-white rounded-t drag-handle h-[2.5`rem]">
      {/* Left side text */}
      <div className="font-semibold text-lg">
        {text}
      </div>
      {/* Right side icons */}
      <div className="flex space-x-3">
        <FaPlus className="cursor-pointer hover:text-gray-400" />
        <FaCog className="cursor-pointer hover:text-gray-400" />
        <FaArrowsAlt className="cursor-pointer hover:text-gray-400" />
        <FaTimes className="cursor-pointer hover:text-gray-400" />
      </div>
    </div>
  );
};

export default Header;
