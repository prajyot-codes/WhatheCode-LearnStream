import React, { useRef, useState, useEffect, useContext } from "react";
import { Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthProvider";
import axios from "../api/axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  useEffect(() => {
  const accessToken = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  if (accessToken && userId && role) {
    navigate(`/${role}/${userId}`, { replace: true });
  }
}, [navigate]);


  // Shared logic for both forms
  const [studentEmail, setStudentEmail] = useState("");
  const [studentPwd, setStudentPwd] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherPwd, setTeacherPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (role, email, password) => {
    try {
      setLoading(true);
      setErrMsg("");
      const response = await axios.post(`/user/${role}/login`,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.data?.accessToken;
      const user_id = response?.data?.data?.user._id;
      const roles = response?.data?.data?.role;
      const name = response?.data?.data?.user.name;

      localStorage.setItem("name", name);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("role", roles);

      setAuth({ user_id, name, roles, accessToken });

      const targetUrl = `/${role}/${user_id}`;
      window.location.href = targetUrl;

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans">
      <div className="w-full max-w-6xl bg-white shadow-lg grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden">

        {/* Student Login */}
        <div className="p-10">
          <div className="flex flex-col items-center">
            <img src="../../public/assets/Screenshot 2025-05-23 103312 (1).png" alt="Student" className="w-92" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Student Login</h2>
            <p className="text-sm text-gray-500">
              Not a member yet?{" "}
              <Link to="/signup/student" className="text-green-500 hover:underline">Sign up!</Link>
            </p>
          </div>
          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin("student", studentEmail, studentPwd);
            }}
          >
            <TextInput
              type="email"
              placeholder="Username or E-mail"
              value={studentEmail}
              onChange={(e) => setStudentEmail(e.target.value)}
              className="w-full p-3 border rounded mt-4"
              required
            />
            <TextInput
              type="password"
              placeholder="Password"
              value={studentPwd}
              onChange={(e) => setStudentPwd(e.target.value)}
              className="w-full p-3 border rounded mt-4"
              required
            />
            <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
              <label className="flex items-center">
                <input type="checkbox" className="mr-1" />
                Remember me
              </label>
              <a href="#" className="hover:underline">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 mt-4 rounded"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Login"}
            </button>
            {errMsg && <p className="text-red-500 text-center mt-2">{errMsg}</p>}
          </form>
        </div>

        {/* Teacher Login */}
        <div className="bg-gray-50 p-10">
          <div className="flex flex-col items-center">
            <img src="../../public/assets/Screenshot 2025-05-23 103846.png" alt="Teacher" className="w-92" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Teacher Login</h2>
            <p className="text-sm text-gray-500">
              Not a member yet?{" "}
              <Link to="/signup/teacher" className="text-green-500 hover:underline">Sign up!</Link>
            </p>
          </div>
          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin("teacher", teacherEmail, teacherPwd);
            }}
          >
            <TextInput
              type="email"
              placeholder="Username or E-mail"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              className="w-full p-3 border rounded mt-4"
              required
            />
            <TextInput
              type="password"
              placeholder="Password"
              value={teacherPwd}
              onChange={(e) => setTeacherPwd(e.target.value)}
              className="w-full p-3 border rounded mt-4"
              required
            />
            <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
              <label className="flex items-center">
                <input type="checkbox" className="mr-1" />
                Remember me
              </label>
              <a href="#" className="hover:underline">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 mt-4 rounded"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" /> : "Login"}
            </button>
            {errMsg && <p className="text-red-500 text-center mt-2">{errMsg}</p>}
          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
