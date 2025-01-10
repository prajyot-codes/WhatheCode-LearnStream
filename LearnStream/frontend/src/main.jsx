import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
Home
import { AuthProvider } from './contexts/AuthProvider.jsx'
import Home from './Pages/Home.jsx'
import LoginS from './Pages/Login-students.jsx'
import LoginT from './Pages/Login-teacher.jsx'
import Teachers from './Pages/Teachers.jsx'
import Student from './Pages/Student.jsx'
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
      <Route path='/' element={<Home/>} />
      <Route path='student/login' element={<LoginS />} />
      <Route path='teacher/login' element={<LoginT />} />
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