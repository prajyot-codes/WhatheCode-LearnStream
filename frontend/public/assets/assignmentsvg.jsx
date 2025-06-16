import React from "react";

const AssignmentIcon = ({ size = 24, color = "black" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill={color} xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_8884_38174)">
        <path d="M22.5 23.5H9.5V25.5H22.5V23.5Z" fill={color}></path>
        <path d="M22.5002 19.5H9.49023V21.51H22.5002V19.5Z" fill={color}></path>
        <path d="M22.5 15.5H9.5V17.5H22.5V15.5Z" fill={color}></path>
        <path d="M19.3335 2H6.3335C5.7835 2 5.3335 2.45 5.3335 3V30H7.3335V4H18.3335V10C18.3335 10.55 18.7835 11 19.3335 11H25.3335V28H9.3335V30H26.3335C26.8835 30 27.3335 29.55 27.3335 29V10C27.3335 9.73 27.2235 9.48 27.0435 9.29L20.0435 2.29C19.8535 2.1 19.6035 2 19.3335 2ZM20.3335 9V5.41L23.9235 9H20.3335Z" fill={color}></path>
        <path d="M12.75 8C13.71 8 14.5 8.79 14.5 9.75C14.5 10.71 13.71 11.5 12.75 11.5C11.79 11.5 11 10.71 11 9.75C11 8.79 11.79 8 12.75 8ZM12.75 6C10.68 6 9 7.68 9 9.75C9 11.82 10.68 13.5 12.75 13.5C14.82 13.5 16.5 11.82 16.5 9.75C16.5 7.68 14.82 6 12.75 6Z" fill={color}></path>
      </g>
      <defs>
        <clipPath id="clip0_8884_38174">
          <rect width="32" height="32" fill="white"></rect>
        </clipPath>
      </defs>
    </svg>
  );
};

export default AssignmentIcon;
