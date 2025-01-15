import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
Home
import { AuthProvider } from './contexts/AuthProvider.jsx'

import LoginS from './Pages/Login-students.jsx'
import LoginT from './Pages/Login-teacher.jsx'
import SignupS from './Pages/Signup-students.jsx'
import Teachers from './Pages/Teachers.jsx'
import Student from './Pages/Student.jsx'
import LoginCommon from './Pages/LoginCommon.jsx'
import Home from './Pages/Home.jsx'
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,
//     children: [
//       {
//         path: "",
//         element: <Home />
//       },
//       {
//         path: "about",
//         element: <About />
//       },
//       {
//         path: "contact",
//         element: <Contact />
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element = {<Home/>}/>
      <Route path='login' element={<LoginCommon/>} />
      <Route path='login/student' element={<LoginS />} />
      <Route path='login/teacher' element={<LoginT />} />
      <Route path='signup/student' element={<SignupS/>} />
      <Route path='teacher/:user_id' element = {<Teachers/>}/>
      <Route path='student/:user_id' element = {<Student/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)