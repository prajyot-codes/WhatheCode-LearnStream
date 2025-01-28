import React, { useState, useRef, useEffect, useContext } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios"; // Axios instance with base URL
import AuthContext from "../contexts/AuthProvider";

// Regex for validations
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^.{8,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signup = ({ role, verb = "amazing" }) => {
  const navigate = useNavigate();
  const SignupURL = `/user/${role}/signup`; // API endpoint based on role
  const { setAuth } = useContext(AuthContext);
  // Refs for form and error focus
  const userRef = useRef(null);
  const errRef = useRef();

  // States for form data and validations
  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Focus on the username field when the component loads
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    // Validate username
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    // Validate email
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    // Validate password and matching password
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    // Clear error messages when inputs change
    setErrMsg("");
  }, [user, email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form inputs before submission
    if (!validName || !validPwd || !validEmail) {
      setErrMsg("Invalid form data. Please check your inputs.");
      return;
    }

    if (!document.getElementById("agree").checked) {
      setErrMsg("You must agree to the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post(
        SignupURL,
        JSON.stringify({ name: user, email, password: pwd }),
        { headers: { "Content-Type": "application/json" } },
      );

      // Extract user data from the response
      const { accessToken, user: userData } = response.data.data;
      localStorage.setItem("user_id", userData._id);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("name", userData.name);
      localStorage.setItem(
        "avatarUrl",
        userData.avatar || "https://via.placeholder.com/150",
      );

      setAuth({
        user_id: userData._id,
        accessToken,
        name: userData.name,
        role,
      });
      // Redirect user based on role
      const targetUrl = `/${role}/${userData._id}`;
      navigate(targetUrl);
      setSuccess(true);

      // Clear form fields
      setUser("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      // Handle errors
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username or Email Already Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current?.focus();
    }
  };

  return success ? (
    <section className="p-4 text-center" data-oid="3oczxfr">
      <h1 className="text-2xl font-bold mb-4" data-oid="p5lvk96">
        You are logged in!
      </h1>
      <p className="text-gray-600" data-oid="tm1fpzb">
        Welcome back to LearnStream!
      </p>
    </section>
  ) : (
    <div
      className="p-4 rounded-lg border-2 border-gray-300 max-w-md mx-auto"
      data-oid="lstbdri"
    >
      <p
        ref={errRef}
        className={`text-red-600 text-center ${errMsg ? "visible" : "hidden"}`}
        aria-live="assertive"
        data-oid="i3v-s2l"
      >
        {errMsg}
      </p>
      <h2 className="text-xl font-bold mb-2" data-oid="xs3cpvq">
        Welcome to LearnStream
      </h2>
      <p className="mb-4" data-oid="1wjeutn">
        Register to start your {verb} journey
      </p>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        data-oid="q:igovz"
      >
        <div data-oid="hn37mn5">
          <Label htmlFor="username" value="Username" data-oid="70voh4f" />
          <TextInput
            id="username"
            type="text"
            placeholder="Username"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            shadow
            aria-invalid={!validName}
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            data-oid="rt1j3h."
          />

          {userFocus && user && !validName && (
            <p className="text-sm text-red-600" data-oid="7t6x:q-">
              4-24 characters, start with a letter.
            </p>
          )}
        </div>
        <div data-oid="ple1-s3">
          <Label htmlFor="email" value="Email" data-oid="ttt0zlo" />
          <TextInput
            id="email"
            type="email"
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            shadow
            aria-invalid={!validEmail}
            onFocus={() => setEmailFocus(true)}
            onBlur={() => setEmailFocus(false)}
            data-oid="77x2kns"
          />

          {emailFocus && email && !validEmail && (
            <p className="text-sm text-red-600" data-oid="2uxt1tf">
              Enter a valid email address.
            </p>
          )}
        </div>
        <div data-oid="lbhiek-">
          <Label htmlFor="password" value="Password" data-oid="fsgd4hp" />
          <TextInput
            id="password"
            type="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            shadow
            aria-invalid={!validPwd}
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            data-oid="sz-ccab"
          />

          {pwdFocus && (
            <ul className="text-sm text-red-600" data-oid="p2gdvk.">
              <li
                className={pwd.length >= 8 ? "text-green-600" : ""}
                data-oid="g0g86h-"
              >
                At least 8 characters
              </li>
            </ul>
          )}
        </div>
        <div data-oid="wlb7u_4">
          <Label
            htmlFor="repeat-password"
            value="Confirm Password"
            data-oid="2vopvxi"
          />
          <TextInput
            id="repeat-password"
            type="password"
            onChange={(e) => setMatchPwd(e.target.value)}
            value={matchPwd}
            required
            shadow
            aria-invalid={!validMatch}
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            data-oid="347fqcf"
          />

          {matchFocus && !validMatch && (
            <p className="text-sm text-red-600" data-oid="bmzidlw">
              Passwords do not match.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2" data-oid="3qysggp">
          <Checkbox id="agree" data-oid="gl:yvkg" />
          <Label htmlFor="agree" data-oid="a_:5ida">
            I agree with the{" "}
            <Link
              to="/terms"
              className="text-cyan-600 hover:underline"
              data-oid="47-lbtf"
            >
              terms and conditions
            </Link>
          </Label>
        </div>
        <Button type="submit" data-oid="1.81-pe">
          Register new account
        </Button>
      </form>
    </div>
  );
};

export default Signup;
