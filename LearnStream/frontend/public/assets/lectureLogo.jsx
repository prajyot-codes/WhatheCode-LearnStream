import React from 'react';

const CustomIcon = ({ width = 20, height = 20, color = "currentColor" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none" width={width} height={height}>
      <path 
        d="M8.922 12.5l3.484-2.234a.3.3 0 00.14-.266.3.3 0 00-.14-.266L8.922 7.5a.278.278 0 00-.32-.016.304.304 0 00-.165.282v4.468c0 .125.055.22.165.282.109.062.216.057.32-.016zM5 15c-.344 0-.638-.122-.883-.367a1.204 1.204 0 01-.367-.883v-7.5c0-.344.122-.638.367-.883S4.657 5 5 5h10c.344 0 .638.122.883.367s.367.54.367.883v7.5c0 .344-.122.638-.367.883A1.204 1.204 0 0115 15H5zm0-1.25h10v-7.5H5v7.5z" 
        fill={color}
      />
    </svg>
  );
};

export default CustomIcon;
