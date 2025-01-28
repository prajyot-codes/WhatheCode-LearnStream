import React from "react";
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";

import { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "../contexts/AuthProvider";
import axios from "../api/axios";

import { Link, useNavigate } from "react-router-dom";
function Component({ role }) {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef?.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const accessToken = localStorage.getItem("accessToken");
    const name = localStorage.getItem("name");
    if ((userId && accessToken) || success) {
      navigate(`/${role}/${userId}`, { state: { name } });
    }
  }, [navigate, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `/user/${role}/login`,
        JSON.stringify({ email: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.data?.accessToken;
      const user_id = response?.data?.data?.user._id;
      const roles = response?.data?.data?.role;
      const name = response?.data?.data?.user.name;
      console.log(name);
      localStorage.setItem("name", name);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user_id", user_id);
      localStorage.setItem("role", roles);
      setAuth({ user_id, name, roles, accessToken });
      const targetUrl = `/${role}/${user_id}`;
      navigate(targetUrl);
      window.location.href = targetUrl;
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (localStorage.getItem(`user_id`) &&
    localStorage.getItem(`accessToken`)) ||
    success ? (
    <>
      <Spinner data-oid="7390doz" />
    </>
  ) : (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-md flex-col gap-4"
      data-oid="istepuk"
    >
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
        data-oid="8l0l3i4"
      >
        {errMsg}
      </p>
      {/* Email Field */}
      <div data-oid="sw:5:oj">
        <div className="mb-2 block" data-oid="73mf1u-">
          <Label htmlFor="email1" value="Your email" data-oid="0:qiryy" />
        </div>
        <TextInput
          id="email"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          type="email"
          placeholder="email"
          data-oid="nf__go5"
        />
      </div>

      {/* Password Field */}
      <div data-oid="5ahgqaf">
        <div className="mb-2 block" data-oid="q.kh-eu">
          <Label htmlFor="password1" value="Your password" data-oid="-0eh0va" />
        </div>
        <TextInput
          id="password1"
          type="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
          data-oid="-hg_c.-"
        />
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center gap-2" data-oid="m917fv_">
        <Checkbox id="remember" data-oid="0w3dz4w" />
        <Label htmlFor="remember" data-oid="oswayzc">
          Remember me
        </Label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="bg-[#7ED757] text-white font-medium"
        data-oid="gjbh:ol"
      >
        Submit
      </Button>
    </form>
  );
}

export default Component;
