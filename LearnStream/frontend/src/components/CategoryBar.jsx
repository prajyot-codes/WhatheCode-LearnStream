import React from "react";

const CategoryBar = () => {
  const categories = [
    "Arts and Humanities",
    "Business",
    "Computer Science",
    "Data Science",
    "Information Technology",
    "Health",
    "Math and Logic",
    "Personal Development",
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4 overflow-x-auto py-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="text-gray-700 hover:text-blue-600 whitespace-nowrap px-4 py-2 font-medium focus:outline-none focus:ring focus:ring-blue-300 rounded"
            >
              {category}
            </button>
          ))}
          <button className="text-gray-700 hover:text-blue-600 whitespace-nowrap px-4 py-2 font-medium focus:outline-none focus:ring focus:ring-blue-300 rounded">
            <span className="inline-block">›</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;
