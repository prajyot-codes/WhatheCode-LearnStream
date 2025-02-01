import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "../api/axios";
import { Button } from "flowbite-react";
import { Link,useNavigate } from "react-router-dom";
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
const [course_id, setcourse_id] = useState('')

  const role='teacher';
  const { user_id } = useParams();
  const errRef = useRef();
  const [course_id,setCourse_id] = useState('')
  const [errMsg, setErrMsg] = useState('');
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    setErrMsg('');
  }, [user_id]);

  const userAccessToken = localStorage.getItem('accessToken');
  
  useEffect(() => { 
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`courses/teacher/${user_id}`, {
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

  
  const navigate=useNavigate()
  const viewCourse = (course_id)=>{
    navigate(`/teacher/${user_id}/${course_id}`)
  }
  return (
    <div>
      {/* Navbar */}
      {/* <Component /> */}

      {/* Offers Section */}
      <div className="bg-gray-300 text-center text-xl font-semibold">
        <img src="../../public/assets/10ca89f6-811b-400e-983b-32c5cd76725a.jpg" alt="" />
      </div>

      <section className="m-5 text-3xl">
          <h1>Welcome <span className="font-league bold text-4xl">{name.charAt(0).toUpperCase() + name.slice(1)}</span></h1>
          </section>

      {/* My Learning Section */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-4">My Courses</h3>
        <div className="flex   flex-wrap gap-6">
         <CourseComp setCourse_id={setcourse_id} courses={courses}  errMsg={errMsg} ButtonName={'Edit Course'} buttonHandler={viewCourse} errRef={errRef} />
        </div>
      </div>

      {/* Top Courses Section */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-4">Top Courses</h3>
        <div className="flex gap-6">
          <GeneralCourses ButtonName={`View Course`} buttonHandler={viewCourse} setCourse_id = {setCourse_id}errMsg={errMsg} setErrMsg={setErrMsg}/> 
        </div>
      </div>

      

      {/* Sticky Button */}
      <div className="relative bottom-4 right-4">
        <Link to={`/${role}/${user_id}/makecourse`}>
        <Button pill className="w-45  h-12 rounded-full flex items-center justify-center">
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