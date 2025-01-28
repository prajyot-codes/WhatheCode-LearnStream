import React from "react";

import Footer from "./components/Footer.jsx";
import { Outlet } from "react-router-dom";
import Navbar1 from "./components/Navbar1";
function Layout() {
  return (
    <>
      <Navbar1 data-oid="a-y0j73" />
      <Outlet data-oid="rjllt13" />
      <Footer data-oid="yvy.fem" />
    </>
  );
}

export default Layout;
