import React from "react";

const CategoryBar = ({ categories, onCategorySelect }) => {
  return (
    <div className="bg-white border-b border-gray-200" data-oid="5l78:6d">
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        data-oid="9qkngm3"
      >
        <div
          className="flex items-center space-x-4 overflow-x-auto py-4"
          data-oid="532apmx"
        >
          {categories.map((category, index) => (
            <button
              key={index}
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap px-4 py-2 font-medium focus:outline-none focus:ring focus:ring-blue-300 rounded"
              onClick={() => onCategorySelect(category)} // Trigger category change
              data-oid="ka3mi9q"
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
