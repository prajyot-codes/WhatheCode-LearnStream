import React from "react";
import Component from "../components/login-form";
function LoginT() {
  return (
    <div className="flex">
      {/* Left Div */}
      <div className="bg-white border-r-2 overflow-hidden border-black w-1/2 h-screen text-black flex justify-center items-center">
        {/* Login Form */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-md w-96">
            <h2 className="text-center text-xl">Welcome Back</h2>
            <br />
        <Component/>
        </div>
      </div>

      {/* Right Div */}
      <div className="bg-white border-l-2 overflow-hidden border-black w-1/2 h-screen text-black flex justify-center items-center">
        <h2 className="text-xl font-semibold">Welcome to Our Platform! some image</h2>
      </div>
    </div>
  );
}

export default LoginT;
