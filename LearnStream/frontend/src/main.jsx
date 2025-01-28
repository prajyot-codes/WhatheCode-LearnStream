import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";

import LoginS from "./Pages/Login-students.jsx";
import LoginT from "./Pages/Login-teacher.jsx";
import SignupS from "./Pages/Signup-students.jsx";
import SignupT from "./Pages/Signup-Teacher.jsx";
import Teachers from "./Pages/TeachersPage.jsx";
import Student from "./Pages/StudentPage.jsx";
import LoginCommon from "./Pages/LoginCommon.jsx";
import Home from "./Pages/Home.jsx";
import MakeaCourse from "./Pages/MakeaCourse.jsx";
import ModuleForm from "./Pages/Courseupdatation.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout data-oid="3dn-c.w" />} data-oid="m0a-_bn">
      <Route
        path="/"
        element={<Home data-oid=".lqg.fi" />}
        data-oid="zzy8hg."
      />
      <Route
        path="login"
        element={<LoginCommon data-oid="6m2lv91" />}
        data-oid="qmc0bm6"
      />
      <Route
        path="login/student"
        element={<LoginS data-oid="o2yov0." />}
        data-oid="wui6o7l"
      />
      <Route
        path="login/teacher"
        element={<LoginT data-oid="i7auqbx" />}
        data-oid="kgjbedj"
      />
      <Route
        path="signup/student"
        element={<SignupS data-oid="ph6plz2" />}
        data-oid="uxbkzlp"
      />
      <Route
        path="signup/teacher"
        element={<SignupT data-oid="bn7p.f:" />}
        data-oid="ou0be.l"
      />
      <Route
        path="teacher/:user_id"
        element={<Teachers data-oid="8yx:s5j" />}
        data-oid="njjg5qa"
      />
      <Route
        path="teacher/:user_id/makecourse"
        element={<MakeaCourse data-oid="_ec-yo6" />}
        data-oid="k-oud--"
      />
      <Route
        path="teacher/:user_id/:course_id"
        element={<ModuleForm data-oid="vtaqcjm" />}
        data-oid="wvo:azl"
      />
      <Route
        path="student/:user_id"
        element={<Student data-oid="63v1f8k" />}
        data-oid="w2_t:k_"
      />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode data-oid="5cl-2ng">
    <AuthProvider data-oid="7hab1nh">
      <RouterProvider router={router} data-oid="jmw5f6b" />
    </AuthProvider>
  </React.StrictMode>,
);
