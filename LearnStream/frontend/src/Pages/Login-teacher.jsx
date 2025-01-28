import React, { useContext, useEffect, useState } from "react";
import Component from "../components/login-form";
import AuthContext from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
function LoginT() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  useEffect(() => {
    if (role == "student") {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="flex" data-oid="mcirwa4">
      {/* Left Div */}
      <div
        className="bg-white border-r-2 overflow-hidden border-black w-1/2 h-screen text-black flex justify-center items-center"
        data-oid="bs.im7o"
      >
        {/* Login Form */}
        <div
          className="bg-gray-100 p-8 rounded-lg shadow-md w-96"
          data-oid="8261xpq"
        >
          <h2 className="text-center text-xl" data-oid="qgzgdlt">
            Welcome Back
          </h2>
          <br data-oid="2wn_7_x" />
          <Component role="teacher" data-oid="l3rb269" />
        </div>
      </div>

      {/* Right Div */}
      <div
        className="bg-white border-l-2 overflow-hidden border-black w-1/2 h-screen text-black flex justify-center items-center"
        data-oid="38a2c:7"
      >
        <h2 className="text-xl font-semibold" data-oid="k2i3om2">
          Welcome to Our Platform! some image
        </h2>
      </div>
    </div>
  );
}

export default LoginT;
