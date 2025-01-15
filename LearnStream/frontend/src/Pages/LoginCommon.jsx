// import React from 'react';

import { Link } from "react-router-dom";
import "../index.css";
import { Button } from "flowbite-react";

function LoginCommon() {

  return (
    <div className="flex">
      {/* Left div with white background */}
      <div className="bg-white border-r-2 overflow-hidden border-black w-1/2 h-screen text-white flex justify-center items-center">
        {/* Centered div */}
        <div className="bg-white w-4/12 h-auto flex justify-center items-center text-black">
          <div className="text-center">
            <h1 className="text-[#588157] text-2xl">For Teachers</h1>
            <br />
            <p>Lorem, ipsum dolor sit amet adipisicing elit. Blanditiis fuga id qui iusto assumenda nisi? Dignissimos, error ratione.</p>
            <br />
            <div className="flex justify-center flex-col items-center">
              <Button 
              color="success">
                <Link
                to='/login/teacher'>
                Login
                </Link>
                </Button>
              <br />
              <p className="mt-2">Don't have an account?</p>
              <p className="cursor-pointer">create an account</p>

            </div>
          </div>
        </div>
      </div>

      {/* Right div with white background */}
      <div className="bg-white border-l-2 overflow-hidden border-black w-1/2 h-screen flex justify-center items-center">
        {/* Centered div */}
        <div className="bg-white w-4/12 h-auto flex justify-center items-center text-black">
          <div className="text-center">
            <h1 className="text-[#588157] text-2xl">For Students</h1>
            <br />
           
            <p>Lorem, ipsum dolor sit amet adipisicing elit. Blanditiis fuga id qui iusto assumenda nisi? Dignissimos, error ratione.</p>
            <br />
            <div className="flex justify-center flex-col items-center">
            <Link
            to='/login/student'>
              <Button color="success">Login</Button>
            </Link>
              <br />
              <p className="mt-2">Don’t have an account?</p>
              <p className="cursor-pointer">create an account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCommon;
