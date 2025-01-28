import React from "react";
import { Card } from "flowbite-react";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";
const CourseComp = ({
  courses = [],
  ButtonName,
  buttonHandler,
  errRef,
  errMsg,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = (e, courseId) => {
    e.preventDefault();
    const navigationUrl = "";
    if (localStorage.getItem("role") == "teacher")
      navigationUrl(`/teacher/${userId}/${courseId}`);
    navigate();
  };
  const userId = localStorage.getItem("user_id");
  const username = localStorage.getItem("name");
  return (
    <div className="flex flex-wrap gap-6" data-oid="skx5xon">
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
        data-oid="c-eb_80"
      >
        {errMsg}
      </p>
      {courses?.map((course) => (
        <Card
          className="max-w-sm"
          key={course._id}
          imgSrc={course?.thumbnail}
          data-oid="8sefrzk"
        >
          <a href="#" data-oid="1vyan1a">
            <h5
              className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
              data-oid="euw:_yq"
            >
              {course?.title}
            </h5>
          </a>
          <div className="mb-5 mt-2.5 flex items-center" data-oid="s3-xm1g">
            <svg
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              data-oid="9srnfrn"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                data-oid="e99gx3."
              />
            </svg>
            <svg
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              data-oid="2vae0g8"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                data-oid="eljgpor"
              />
            </svg>
            <svg
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              data-oid="3qr43na"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                data-oid=".ynf_g3"
              />
            </svg>
            <svg
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              data-oid="stls6d2"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                data-oid="-n_30wh"
              />
            </svg>
            <svg
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              data-oid=":pkfl7."
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                data-oid="571vi_y"
              />
            </svg>
            <span
              className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800"
              data-oid="q._p-6d"
            >
              5.0
            </span>
          </div>
          <div className="flex items-center justify-between" data-oid="0b.:72g">
            <span
              className="text-3xl font-bold text-gray-900 dark:text-white"
              data-oid="4rvufpp"
            >
              ${course?.price}
            </span>
            <Link
              style={{
                visibility:
                  course.author.name === username ? "visible" : "hidden",
              }}
              onClick={(e) => handleButtonClick(e, course?._id)}
              className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              data-oid="_:ky1ws"
            >
              {ButtonName}
            </Link>
            <p className="text-gray-600" data-oid="aqu6wqj">
              Instructor: {course?.author?.name || getAuthorName}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CourseComp;
