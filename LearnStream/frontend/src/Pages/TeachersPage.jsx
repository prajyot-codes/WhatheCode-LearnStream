import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import axios from "../api/axios";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import GeneralCourses from "../components/GeneralCourses";
import CourseComp from "../components/CourseComp";
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

const Teachers = () => {
  const role = "teacher";
  const { user_id } = useParams();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setErrMsg("");
  }, [user_id]);

  const userAccessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`courses/teacher/${user_id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setCourses(response.data.data.Courses);
        console.log(response);
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
    fetchCourses();
  }, [userAccessToken]);

  const editCourse = async () => {};
  return (
    <div data-oid="dg5zf9l">
      {/* Navbar */}
      {/* <Component /> */}

      {/* Offers Section */}
      <div
        className="bg-gray-300 p-9 text-center text-xl font-semibold"
        data-oid=":ik41cr"
      >
        Offers regarding courses
      </div>

      <section data-oid="x7pxwvc">
        <h1 data-oid="1_l6zgt">
          Welcome {localStorage.getItem("name")}, you are logged in!
        </h1>
      </section>

      {/* My Learning Section */}
      <div className="p-6" data-oid="sn37k0p">
        <h3 className="text-2xl font-semibold mb-4" data-oid="vtk24l9">
          My Courses
        </h3>
        <div className="flex flex-wrap gap-6" data-oid="jcg6v:v">
          <CourseComp
            courses={courses}
            errMsg={errMsg}
            ButtonName={"Edit Course"}
            buttonHandler={editCourse}
            errRef={errRef}
            data-oid="qcz2l0w"
          />
        </div>
      </div>

      {/* Top Courses Section */}
      <div className="p-6" data-oid="108xzp2">
        <h3 className="text-2xl font-semibold mb-4" data-oid="tsg2k72">
          Top Courses
        </h3>
        <div className="flex gap-6" data-oid="wstw3b1">
          <GeneralCourses data-oid="t4_w22." />
        </div>
      </div>

      {/* Sticky Button */}
      <div className="relative bottom-4 right-4" data-oid="ukipt1u">
        <Link to={`/${role}/${user_id}/makecourse`} data-oid="::vsf5j">
          <Button
            pill
            className="w-45 h-12 rounded-full flex items-center justify-center"
            data-oid="urrp3b5"
          >
            Make a new course
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Teachers;
// {videos.map((video) => (
//   <div
//     key={video.id}
//     className="bg-gray-100 rounded-lg p-4 shadow-md w-64 h-auto flex flex-col items-center"
//   >
//     {/* React Player */}
//     <ReactPlayer
//       url={video.src}
//       controls
//       width="100%"
//       height="200px"
//     />
//     Video Title
//     <p className="font-bold text-lg mt-2">{video.title}</p>
//   </div>
// ))}
