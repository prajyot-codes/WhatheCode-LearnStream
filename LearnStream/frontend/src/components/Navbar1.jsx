import React, { useEffect, useState } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
// import {user.jpg} from "../assests/user.jpg"

const Navbar1 = () => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [userName, setUserName] = useState("Guest");
  const navigate = useNavigate();
  // Fetch user details from localStorage when component mounts
  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
    setAccessToken(localStorage.getItem("accessToken"));
    // setAvatarUrl(
    //   localStorage.getItem("avatarUrl") || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Ddefault%2Bavatar&psig=AOvVaw04t_GWwT7vB3zbrFgLQkWh&ust=1737262814023000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJCxsLm-_ooDFQAAAAAdAAAAABAE" // Default placeholder
    // );
    setUserName(localStorage.getItem("user_name") || "Guest");
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `/user/${localStorage.getItem("role")}/logout`,
        {}, // Empty body
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        },
      );

      if (response) {
        localStorage.clear();
        navigate("/");
        window.location.href = "/";
      } else throw Error;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar fluid rounded className="mt-0 pt-3" data-oid="f_gqhtc">
      {/* Brand Logo */}
      <Navbar.Brand
        className="font-league font-[700] text-xl"
        href="/"
        data-oid="e1r3ndv"
      >
        <span className="text-[#7ED757]" data-oid="qldedvf">
          Learn
        </span>
        Stream
      </Navbar.Brand>

      {/* Right Section */}
      <div className="flex md:order-2" data-oid="0yvzoh0">
        {/* Dropdown Menu for Logged-In Users */}
        {userId && accessToken && (
          <Dropdown
            arrowIcon
            inline
            label={
              <Avatar
                alt="User Avatar"
                img={avatarUrl} // Dynamically fetched avatar URL
                rounded
                data-oid="l5t4:0t"
              />
            }
            data-oid="igcam_u"
          >
            <Dropdown.Header data-oid="diinric">
              <span className="block text-sm" data-oid="qrej-ka">
                {userName}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={handleLogout} data-oid="pk4b.80">
              Sign out
            </Dropdown.Item>
          </Dropdown>
        )}

        {/* Navbar Toggle (Mobile) */}
        <Navbar.Toggle data-oid="nqr9pr8" />
      </div>

      {/* Navbar Links */}
      <Navbar.Collapse data-oid="kd1flil">
        <Navbar.Link href="/" active data-oid="i94m4rz">
          Home
        </Navbar.Link>
        <Navbar.Link href="/about" data-oid="ljv5_i3">
          About
        </Navbar.Link>
        <Navbar.Link href="/services" data-oid="o0z8y9i">
          Services
        </Navbar.Link>
        <Navbar.Link href="/pricing" data-oid="j_e6c.t">
          Pricing
        </Navbar.Link>
        <Navbar.Link href="/contact" data-oid="88i.hu.">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbar1;
