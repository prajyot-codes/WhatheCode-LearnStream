import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import axios from "../api/axios";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
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
  const role='teacher';
  const { user_id } = useParams();
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState('');
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setErrMsg('');
  }, [user_id]);

  const userAccessToken = localStorage.getItem('accessToken');
  
  useEffect(() => { 
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`courses/${user_id}`, {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        setCourses(response.data.data.Courses);
        console.log(response);
      } catch (err) {
        console.log(err);
        if (!err?.response) {
          setErrMsg('No Server Response');
        } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg('Courses Retrieval Failed');
        }
        errRef.current.focus();
      }
    };
    fetchCourses();
  }, [userAccessToken]);

  return (
    <div>
      {/* Navbar */}
      {/* <Component /> */}

      {/* Offers Section */}
      <div className="bg-gray-300 p-9 text-center text-xl font-semibold">
        Offers regarding courses
      </div>

      {/* My Learning Section */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-4">My Learning</h3>
        <div className="flex flex-wrap gap-6">
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
          {courses?.map((course) => (
            <div
              key={course._id}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <img className="w-full" src={course.thumbnail} alt="Course Thumbnail" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{course.title}</div>
                <p className="text-gray-700 text-base">
                  {course.description}
                </p>
              </div>
              <div className="px-6 py-4 flex justify-between items-center">
                <span className="text-xl font-semibold">{course.price}</span>
                <span className="text-gray-600">Instructor: {course?.author?.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Courses Section */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-4">Top Courses</h3>
        <div className="flex gap-6">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-gray-100 rounded-lg p-4 shadow-md w-64 h-auto flex flex-col items-center"
            >
              {/* React Player */}
              <ReactPlayer
                url={video.src}
                controls
                width="100%"
                height="200px"
              />
              {/* Video Title */}
              <p className="font-bold text-lg mt-2">{video.title}</p>
            </div>
          ))}
        </div>
      </div>

      <section>
        <h1>Welcome Student {user_id}, you are logged in!</h1>
      </section>

      {/* Sticky Button */}
      <div className="relative bottom-4 right-4">
        <Link to={`/${role}/${user_id}/makecourse`}>
        <Button pill className="w-45 h-12 rounded-full flex items-center justify-center">
          Make a new course
        </Button>
        </Link>
      </div>
    </div>
  );
};

export default Teachers;
