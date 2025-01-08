import React from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../contexts/AuthProvider";
import axios from '../api/axios';
const LOGIN_URL = '/user/student/login';
function Component() {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef?.current?.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email:user, password:pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true 
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.data?.accessToken;
            const user_id = response?.data?.data?.user._id
            const roles = response?.data?.data?.roles;
            localStorage.setItem('accessToken',accessToken);
            localStorage.setItem('user_id',user_id);
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            console.log(err)
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

  return (
    ((localStorage.getItem(`user_id`)&&localStorage.getItem(`accessToken`)) || success) ? (
      <section>
          <h1>You are logged in!</h1>
          <br />
          <p>
             
          </p>
      </section>
  ):(
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      {/* Email Field */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput 
          id="email"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required  type="email" placeholder="email"  />
      </div>

      {/* Password Field */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1"
        type="password"
        onChange={(e) => setPwd(e.target.value)}
        value={pwd}
        required  />
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="bg-[#7ED757] text-white font-medium"
      >
        Submit
      </Button>
    </form>
  )
  );
}

export default Component;
