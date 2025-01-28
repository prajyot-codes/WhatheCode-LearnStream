import React from "react";
import Component from "../components/login-form";
import img1 from "../assests/img1.webp";

function LoginS() {
  return (
    <div className="flex" data-oid="luh6j.f">
      {/* Left Div */}
      <div
        className="bg-white border-r-2 overflow-hidden border-black w-1/2 h-screen text-black flex justify-center items-center"
        data-oid="07i9:vu"
      >
        <div className="text-center" data-oid="3ly9uj2">
          <h2 className="text-xl font-semibold mb-4" data-oid="5h9yvmd"></h2>
          <img
            src={img1}
            alt="Welcome"
            className="w-1/2 mx-auto"
            data-oid="mcgq._4"
          />
        </div>
      </div>

      {/* Right Div */}
      <div
        className="bg-white border-l-2 overflow-hidden border-black w-1/2 h-screen text-black flex justify-center items-center"
        data-oid="lvjcp81"
      >
        <div
          className="bg-gray-100 p-8 rounded-lg shadow-md w-96"
          data-oid="1b128_b"
        >
          <h2 className="text-center text-xl mb-4" data-oid="ja0w--y">
            Welcome Back
          </h2>
          <Component role="student" data-oid="vi5n:7s" />
        </div>
      </div>
    </div>
  );
}

export default LoginS;
