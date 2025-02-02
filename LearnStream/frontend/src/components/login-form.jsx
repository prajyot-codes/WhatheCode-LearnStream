import React from "react";
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";

import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../contexts/AuthProvider";
import axios from '../api/axios';

import { Link, useNavigate } from "react-router-dom";
function Component({role}) {
    const navigate = useNavigate();
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
    
    useEffect(() => {
      const userId = localStorage.getItem('user_id');
      const accessToken = localStorage.getItem('accessToken');
      
      if ((userId && accessToken) || success) {
        navigate(`/${role}/${userId}`);
      }
    }, [navigate, success]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/user/${role}/login`,
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
            const roles = response?.data?.data?.role;
            const name = response?.data?.data?.user.name;
            console.log(name);
            localStorage.setItem('name',name);
            localStorage.setItem('accessToken',accessToken);
            localStorage.setItem('user_id',user_id);
            localStorage.setItem('role',roles)
            setAuth({ user_id,name, roles, accessToken });
            const targetUrl = `/${role}/${user_id}`;
            navigate(targetUrl,{ name });
            window.location.href = targetUrl;
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
      <>
      <Spinner/>  
      </>
  
  ):(
    <form  onSubmit={handleSubmit} className="flex max-w-lg  flex-col gap-4">
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
        className="bg-[#2a6411] text-white font-medium"
        
      >
        Submit
      </Button>
    </form>
  )
  );
}

export default Component;
