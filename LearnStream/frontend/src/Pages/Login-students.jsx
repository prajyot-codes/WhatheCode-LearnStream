import React from 'react';
import Component from '../components/login-form';
import img1 from '../assests/img1.webp';

function LoginS() {
  return (
    <div className="flex">
      {/* Left Div */}
      <div className="bg-white border-r-2 overflow-hidden border-black w-1/2 h-screen text-black flex justify-center items-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4"></h2>
          <img src={img1} alt="Welcome" className="w-1/2 mx-auto" />
        </div>
      </div>

      {/* Right Div */}
      <div className="bg-white border-l-2 overflow-hidden border-black w-1/2 h-screen text-black flex justify-center items-center">
        <div className="bg-gray-100 p-8 rounded-lg shadow-md w-96">
          <h2 className="text-center text-xl mb-4">Welcome Back</h2>
          <Component role="student" />
        </div>
      </div>
    </div>
  );
}

export default LoginS;
