import React from 'react'

import Footer from './components/Footer.jsx'
import { Outlet } from 'react-router-dom'
import Navbar1 from './components/Navbar1'
function Layout() {
  return (
    <>
    <Navbar1/>
    <Outlet />
    <Footer />
    </>
  )
}

export default Layout