import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";

import CourseComp from "../components/CourseComp";
import { asyncHandler } from "../../../backend/src/utils/asyncHandler";
import GeneralCourses from "../components/GeneralCourses";

const videos = [
  {
    id: 1,
    title: "Advanced React",
    src: "/assets/videos/video2.mp4", // Update with your actual local file path
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    src: "/assets/videos/video2.mp4", // Update with your actual local file path
  },
];

const Student = () => {
  const { user_id } = useParams();
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const { name } = location.state || {};
  const errRef = useRef();
  // const ModuleRef = useRef();
  const [course_id, setCourse_id] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [studentcourses, setStudentCourses] = useState([]);

  useEffect(() => {
    setErrMsg("");
  }, [user_id]);

  // const userAccessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        const response = await axios.get(`courses/${user_id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setStudentCourses(response.data.data.Courses);
        console.log(localStorage.getItem("accessToken"));
      } catch (err) {
        console.log(err);
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Courses Retrieval Failed");
        }
        errRef.current.focus();
      }
    };
    fetchStudentCourses();
  }, [localStorage.getItem("accessToken")]);
  const viewCourse = () => {
    const navigate = useNavigate();
    navigate((to = `/modules`));
  };
  return (
    <div data-oid="ssdy6.k">
      {/* Navbar */}
      {/* <Component /> */}

      {/* Offers Section */}
      <div
        className="bg-gray-300 p-9 text-center text-xl font-semibold"
        data-oid="_rtmd2l"
      >
        Offers regarding courses
      </div>

      {/* My Learning Section */}
      <div className="p-6" data-oid="bfxx3io">
        <h3 className="text-2xl font-semibold mb-4" data-oid="z2hjeib">
          My Learning
        </h3>
        <CourseComp
          courses={studentcourses}
          ButtonName={`View Course`}
          buttonHandler={viewCourse}
          errRef={errRef}
          errMsg={errMsg}
          data-oid="lmi_93k"
        />
      </div>

      {/* Top Courses Section */}
      <div className="p-6" data-oid="5_wb_od">
        <h3 className="text-2xl font-semibold mb-4" data-oid="9bsbs0k">
          Top Courses
        </h3>
        <div className="flex gap-6" data-oid="kirl6a8">
          <GeneralCourses
            viewCourse={viewCourse}
            errMsg={errMsg}
            setErrMsg={setErrMsg}
            data-oid="9o5m059"
          />
        </div>
      </div>
      <section data-oid="7y9xy0c">
        <h1 data-oid="3c7p3.y">Welcome Student {name}, you are logged in!</h1>
      </section>
    </div>
  );
};

export default Student;
