import React from "react";
import images from "../../public/assets/images.jpeg"

function BackgroundWrapper({ children,url="" }) {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${url}))` }} // Change to your image path
    >
      {/* Blurred Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Glassmorphism Card Wrapper */}
      <div className="relative bg-white bg-opacity-10 backdrop-blur-xl shadow-2xl rounded-xl p-8 w-96 text-white">
        {children}
      </div>
    </div>
  );
}

export default BackgroundWrapper;
