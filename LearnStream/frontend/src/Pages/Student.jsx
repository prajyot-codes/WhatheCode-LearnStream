
  import React, { useEffect, useRef, useState } from "react";
  import { useLocation, useParams } from 'react-router-dom';
  import axios from "../api/axios";
  import { Card } from "flowbite-react";

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
      const {name }= location.state || {};
      const errRef = useRef();
      const [errMsg, setErrMsg] = useState('');
      const [courses,setCourses] = useState([])
      const enrollStudent =async (course_id)=>{

          try {
            const response = await axios.post(`/courses/${course_id}/enroll`,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true 
            })
          } catch (error) {
            console.log(error);
          }
      }
      useEffect(() => {
              setErrMsg('');
          }, [user_id])
          
      const userAccessToken = localStorage.getItem('accessToken') 
      useEffect(()=>{ 
        const fetchCourses = async ()=>{
          try {
            const response =await axios.get(`courses/${user_id}`,{
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true 
          })
            setCourses(response.data.data.Courses);
          console.log('console.log');
          console.log(localStorage.getItem('accessToken'));
          } catch (err) {
            console.log(err)
                if (!err?.response) {
                    setErrMsg('No Server Response');
                }
                else if (err.response?.status === 401) {
                    setErrMsg('Unauthorized');
                } else {
                    setErrMsg('Courses Retrieval Failed');
                }
                errRef.current.focus();
          }
      }
      fetchCourses();
    },[userAccessToken])  

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
                <Card
                className="max-w-sm"
                key = {course._id}
                imgSrc= {course?.thumbnail}
              >
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {course.title}
                  </h5>
                </a>
                <div className="mb-5 mt-2.5 flex items-center">
                  <svg
                    className="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg
                    className="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg
                    className="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg
                    className="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <svg
                    className="h-5 w-5 text-yellow-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
                    5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
                  <a
                    href="#"
                    onClick={()=>{enrollStudent(course._id)}}
                    className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                  >
                    Enroll
                  </a>
                </div>
              </Card>
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
                  {/* Video Player */}
                  <video controls className="w-full rounded">
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  {/* Video Title */}
                  <p className="font-bold text-lg mt-2">{video.title}</p>
                </div>
              ))}
            </div>
          </div>
          <section>
            <h1>Welcome Student {name}, you are logged in!</h1>
          </section>
        </div>
      );
    };
    
    export default Student;
