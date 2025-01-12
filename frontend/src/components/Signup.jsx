import React, { useState, useRef, useEffect } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^.{8,}$/; 
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signup = (props) => {
  const SignupURL = `/user/student/signup`;

  const userRef = useRef();
  const errRef = useRef();

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
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  },[user,pwd,matchPwd])
    
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
      
      console.log(response?.data)

      // Access the accessToken and userId from the response data
      const accessToken = response?.data?.data?.accessToken;
      const userId = response?.data?.data?.userId;
  
      // Print the accessToken and userId to the console
      console.log("Access Token:", accessToken);
      console.log("User ID:", userId);
  
      // If registration is successful
      setSuccess(true);
      setUser("");
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username or Email Already Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };
  


  return (
     success ? (
      <section className="p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">You are logged in!</h1>
        <p className="text-gray-600">Welcome back to LearnStream!</p>
      </section>
    ) : (
      <div className="p-4 rounded-lg border-2 border-gray-300 max-w-md mx-auto">
        <p
          ref={errRef}
          className={`text-red-600 text-center ${errMsg ? "visible" : "hidden"}`}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h2 className="text-xl font-bold mb-2">Welcome to LearnStream</h2>
        <p className="mb-4">Register to start your {props.verb || "amazing"} journey</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="username" value="Username" />
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
            />
            {userFocus && user && !validName && (
              <p className="text-sm text-red-600">4-24 characters, start with a letter.</p>
            )}
          </div>
          <div>
            <Label htmlFor="email" value="Email" />
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
            />
            {emailFocus && email && !validEmail && (
              <p className="text-sm text-red-600">Enter a valid email address.</p>
            )}
          </div>
          <div>
            <Label htmlFor="password" value="Password" />
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
            />
            {pwdFocus && (
              <ul className="text-sm text-red-600">
                <li className={pwd.length >= 8 ? "text-green-600" : ""}>At least 8 characters</li>
                {/* <li className={/[A-Z]/.test(pwd) ? "text-green-600" : ""}>One uppercase letter</li>
                <li className={/[a-z]/.test(pwd) ? "text-green-600" : ""}>One lowercase letter</li>
                <li className={/[0-9]/.test(pwd) ? "text-green-600" : ""}>One number</li>
                <li className={/[!@#$%]/.test(pwd) ? "text-green-600" : ""}>
                  One special character (!@#$%)
                </li> */}
              </ul>
            )}
          </div>
          <div>
            <Label htmlFor="repeat-password" value="Confirm Password" />
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
            />
            {matchFocus && !validMatch && (
              <p className="text-sm text-red-600">Passwords do not match.</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="agree" />
            <Label htmlFor="agree">
              I agree with the{" "}
              <Link
                to="/terms"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                terms and conditions
              </Link>
            </Label>
          </div>
          <Button type="submit">Register new account</Button>
        </form>
      </div>
    )
  );
};

export default Signup;
