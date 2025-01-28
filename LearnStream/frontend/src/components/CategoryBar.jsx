import React from "react";
import "../App.css" ; // Make sure to import your CSS file

const CategoryBar = ({ categories, onCategorySelect }) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex items-center space-x-4 overflow-x-auto py-4 custom-scrollbar"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap px-4 py-2 font-medium focus:outline-none focus:ring focus:ring-blue-300 rounded"
              onClick={() => onCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
