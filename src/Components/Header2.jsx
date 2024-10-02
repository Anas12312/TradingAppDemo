import React from 'react';
import { FaPlus, FaCog, FaArrowsAlt, FaTimes } from 'react-icons/fa';

const Header2 = ({ text }) => {
  return (
    <div className="flex justify-between items-center p-2 bg-[#1d4ed8] text-white rounded-t">
      {/* Left side text */}
      <div className="font-semibold text-lg">
        {text}
      </div>
      {/* Right side icons */}
      <div className="flex space-x-3 drag-handle">
        <FaArrowsAlt className="cursor-move hover:text-white" />
      </div>
    </div>
  );
};

export default Header2;
