// import React from 'react';

import { Link } from "react-router-dom";
import "../index.css";
import { Button } from "flowbite-react";

function LoginCommon() {
  return (
    <div className="flex" data-oid="jdu7oy9">
      {/* Left div with white background */}
      <div
        className="bg-white border-r-2 overflow-hidden border-black w-1/2 h-screen text-white flex justify-center items-center"
        data-oid="cl8at9k"
      >
        {/* Centered div */}
        <div
          className="bg-white w-4/12 h-auto flex justify-center items-center text-black"
          data-oid="k_6v_qh"
        >
          <div className="text-center" data-oid="k136364">
            <h1 className="text-[#588157] text-2xl" data-oid="a:kb0ls">
              For Teachers
            </h1>
            <br data-oid="j8a9:kt" />
            <p data-oid=".mfgrt_">
              Lorem, ipsum dolor sit amet adipisicing elit. Blanditiis fuga id
              qui iusto assumenda nisi? Dignissimos, error ratione.
            </p>
            <br data-oid="qe-zm79" />
            <div
              className="flex justify-center flex-col items-center"
              data-oid="2u:8e59"
            >
              <Button color="success" data-oid="dtikg8f">
                <Link to="/login/teacher" data-oid="alfmd8o">
                  Login
                </Link>
              </Button>
              <br data-oid="vh-9e1t" />
              <Link to="/signup/teacher" data-oid="h7rclde">
                <p className="mt-2" data-oid="ziryqtm">
                  Don't have an account?
                </p>
                <p className="cursor-pointer" data-oid=":q5g8um">
                  create an account
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right div with white background */}
      <div
        className="bg-white border-l-2 overflow-hidden border-black w-1/2 h-screen flex justify-center items-center"
        data-oid="m9kyvqa"
      >
        {/* Centered div */}
        <div
          className="bg-white w-4/12 h-auto flex justify-center items-center text-black"
          data-oid="jh1ig1l"
        >
          <div className="text-center" data-oid="32q2yta">
            <h1 className="text-[#588157] text-2xl" data-oid="rli._xd">
              For Students
            </h1>
            <br data-oid="2zrv_qo" />

            <p data-oid="58j2k_8">
              Lorem, ipsum dolor sit amet adipisicing elit. Blanditiis fuga id
              qui iusto assumenda nisi? Dignissimos, error ratione.
            </p>
            <br data-oid="6cq7yar" />
            <div
              className="flex justify-center flex-col items-center"
              data-oid="9fje9q-"
            >
              <Link to="/login/student" data-oid="wz.isgv">
                <Button color="success" data-oid="3g1g5_g">
                  Login
                </Button>
              </Link>
              <br data-oid="s0jt2:l" />
              <Link to="/signup/student" data-oid="kyigo-o">
                <p className="mt-2" data-oid="iccm._8">
                  Don’t have an account?
                </p>
                <p className="cursor-pointer" data-oid="p0pdr7q">
                  create an account
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCommon;
