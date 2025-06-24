import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, DropdownItem, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";
// import {user.jpg} from "../assests/user.jpg"
import {Badge, ShoppingCart} from "lucide-react"
const Navbar1 = () => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const {auth,setAuth} = useContext(AuthContext);
  const role = localStorage.getItem('role')||""
  const [userName, setUserName] = useState("Guest");
  const navigate = useNavigate()
  // Fetch user details from localStorage when component mounts
  useEffect(() => {
    console.log(auth);
    
  }, []);
  const handleMyCourses =  ()=>{
    navigate(`/${auth?.roles}/${auth?.user_id}`)
  }
  const handleLogout =async () => {
    try {
      const response = await axios.post(
        `/user/${auth?.roles}/logout`,
        {}, 
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          withCredentials: true,
        }
      );
      
      if (response){
        localStorage.clear();
        navigate('/');
        setAuth({})
      }
      else throw Error;
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <Navbar fluid rounded className="mt-0 pt-3">
      {/* Brand Logo */}
      <Navbar.Brand className="font-league font-[700] text-xl" href="/">
        <span className="text-[#7ED757]">Learn</span>Stream
      </Navbar.Brand>

      {/* Right Section */}
      <div className="flex md:order-2">
        {/* Dropdown Menu for Logged-In Users */}
        {auth?.user_id && auth?.accessToken && (
          <Dropdown
            arrowIcon
            inline
            label={
              <Avatar
                alt="User Avatar"
                img={avatarUrl} // Dynamically fetched avatar URL
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{userName}</span>
            </Dropdown.Header>
            <Dropdown.Item onClick={(handleMyCourses)}>My Courses</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
        
        {
            /* Cart */
            auth?.user_id && auth?.accessToken &&(
                <ShoppingCart onClick={()=>{
                  navigate(`${auth?.roles}/${auth?.user_id}/Cart`)
                }}>
                </ShoppingCart>
            )
        }
        
        {/* Navbar Toggle (Mobile) */}
        <Navbar.Toggle />
      </div>

      {/* Navbar Links */}
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/services">Services</Navbar.Link>
        <Navbar.Link href="/pricing">Pricing</Navbar.Link>
        <Navbar.Link href="/contact">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbar1;
