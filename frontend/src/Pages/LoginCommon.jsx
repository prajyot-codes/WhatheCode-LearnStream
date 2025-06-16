import { Link } from "react-router-dom";
import "../index.css";
import { Button } from "flowbite-react";

function LoginCommon() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#5ebd79] to-white flex">
      {/* Left Section (Teachers) */}
      <div className=" border-r-2 border-black w-1/2 h-screen flex justify-center items-center">
        <div className=" w-1/2 md:w-4/12 text-black">
          <div className="text-center">
            <h1 className="text-[#588157] text-3xl">For Teachers</h1>
            <p className="text-lg mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            </p>
            <div className="mt-6 flex flex-col items-center">
              <Link to="/login/teacher">
                <Button color="success">Login</Button>
              </Link>
              <p className="mt-2">Don't have an account?</p>
              <Link to="/signup/teacher" className="font-bold">Create an account</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section (Students) */}
      <div className=" border-l-2 border-black w-1/2 h-screen flex justify-center items-center">
        <div className=" w-1/2 md:w-4/12 text-black">
          <div className="text-center">
            <h1 className="text-[#588157] text-3xl">For Students</h1>
            <p className="text-lg mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            </p>
            <div className="mt-6 flex flex-col items-center">
              <Link to="/login/student">
                <Button color="success">Login</Button>
              </Link>
              <p className="mt-2">Don't have an account?</p>
              <Link to="/signup/student" className="font-bold">Create an account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginCommon;
