  import React, { useEffect, useRef, useState } from "react";
  import { useParams, useNavigate } from 'react-router-dom';
  import axios from "../api/axios";
  import { Button } from "flowbite-react";
  import { Link } from "react-router-dom";
  import GeneralCourses from "../components/GeneralCourses";
  import CourseComp from "../components/CourseComp";
  import LearningGoals from "../components/udemycomponent";

  const Teachers = () => {
    const { user_id } = useParams();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');
    const [courses, setCourses] = useState([]);
    const [course_id, setCourse_id] = useState(''); // Single declaration for course_id

    const userAccessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();
    
    useEffect(() => {
      setErrMsg('');
    }, [user_id]);

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

    const viewCourse = (course_id) => {
      navigate(`/teacher/${user_id}/${course_id}`);
    };

    return (
      <div>
        {/* Offers Section */}
        <div className="bg-gray-300 text-center text-xl font-semibold">
          <img src="../../public/assets/10ca89f6-811b-400e-983b-32c5cd76725a.jpg" alt="Offers" />
        </div>

        {/* Welcome Section */}
        <section className="m-5 text-3xl">
          <h1>Welcome <span className="font-league bold text-4xl">{name}</span></h1>
        </section>

        {/* My Learning Section */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">My Courses</h3>
          <div className="flex flex-wrap gap-6">
            <CourseComp 
              setCourse_id={setCourse_id} 
              courses={courses} 
              errMsg={errMsg} 
              ButtonName={'Edit Course'} 
              buttonHandler={viewCourse} 
              errRef={errRef} 
            />
          </div>
        </div>

        {/* Top Courses Section */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">Top Courses</h3>
          <div className="flex gap-6">
            <GeneralCourses 
              ButtonName={`View Course`} 
              buttonHandler={viewCourse} 
              setCourse_id={setCourse_id} 
              errMsg={errMsg} 
              setErrMsg={setErrMsg}
            /> 
          </div>
        </div>

        {/* Sticky Button */}
        <div className="relative bottom-4 right-4">
          <Link to={`/teacher/${user_id}/makecourse`}>
            <Button pill className=" m-10 mx-24 w-45 h-12 rounded-full flex items-center justify-center">
              Make a new course
            </Button>
          </Link>
          <LearningGoals/>
        </div>
      </div>
    );
  };

  export default Teachers;
