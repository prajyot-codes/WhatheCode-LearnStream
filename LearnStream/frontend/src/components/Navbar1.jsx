import React from "react";
import { Avatar, Navbar } from "flowbite-react";

const Navbar1 = () => {
  return (
    <Navbar fluid rounded className="mt-0 pt-0">
      <Navbar.Brand href="/">
        <img src="../../assets/Black And White Aesthetic Minimalist Modern Simple Typography Coconut Cosmetics Logo.png" className="mr-5 h-40 w- sm:h-20" alt="Flowbite React Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        {/* Only Avatar without Dropdown */}
        <Avatar
          alt="User settings"
          img=""
          rounded
        />
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
