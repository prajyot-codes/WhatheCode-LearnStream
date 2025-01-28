import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import { AuthProvider } from './contexts/AuthProvider.jsx';

import LoginS from './Pages/Login-students.jsx';
import LoginT from './Pages/Login-teacher.jsx';
import SignupS from './Pages/Signup-students.jsx';
import SignupT from './Pages/Signup-Teacher.jsx';
import Teachers from './Pages/TeachersPage.jsx';
import Student from './Pages/StudentPage.jsx';
import LoginCommon from './Pages/LoginCommon.jsx';
import Home from './Pages/Home.jsx';
import MakeaCourse from './Pages/MakeaCourse.jsx';
// import ModuleForm from './Pages/Courseupdatation.jsx';
import ViewtheModules from './Pages/ViewtheModules.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<LoginCommon />} />
      <Route path='login/student' element={<LoginS />} />
      <Route path='login/teacher' element={<LoginT />} />
      <Route path='signup/student' element={<SignupS />} />
      <Route path='signup/teacher' element={<SignupT />} />
      <Route path='teacher/:user_id' element={<Teachers />} />
      <Route path='teacher/:user_id/makecourse' element={<MakeaCourse />} />
      {/* <Route path='teacher/:user_id/:course_id' element={<ModuleForm />} /> */}
      <Route path='teacher/:user_id/:course_id' element={<ViewtheModules />} />
      <Route path='student/:user_id' element={<Student />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
