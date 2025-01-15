import React, { useEffect } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";

const Navbar1 = () => {
  // Fetching user details from localStorage
  const userId = localStorage.getItem("user_id");
  const accessToken = localStorage.getItem("accessToken");
  let user_name=localStorage.getItem('user_name');
  const handleLogout = () => {
    // Clear localStorage and handle logout
    localStorage.clear();
    window.location.href = "/"; // Redirect to the homepage or login page
  };

  // useEffect(() => {
    
  // },[localStorage.])

  return (
    <Navbar fluid rounded className="mt-0 pt-3 ">
      <Navbar.Brand className="font-league font-[700] text-xl " href="/">
        <span className="text-[#7ED757]">Learn</span>Stream
      </Navbar.Brand>
      <div className="flex md:order-2">
        {/* Show Avatar only when user_id and accessToken exist */}
        {userId && accessToken && (
          <Dropdown
            arrowIcon={true}
            inline
            label={
              <Avatar
                alt="User settings"
                img=""
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user_name}</span>
            </Dropdown.Header>
            {/* <Dropdown.Item>Dashboard</Dropdown.Item> */}
            {/* <Dropdown.Item>Settings</Dropdown.Item> */}
            {/* <Dropdown.Item>Earnings</Dropdown.Item> */}
            {/* <Dropdown.Divider /> */}
            <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
        {/* Navbar toggle button */}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        {/* Navbar Links */}
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbar1;
