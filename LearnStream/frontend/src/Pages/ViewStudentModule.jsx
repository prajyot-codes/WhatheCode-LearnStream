import React, { useState, useEffect, useCallback, useContext } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../contexts/AuthProvider";
// import Modal from "./Modal";
// import ModuleForm from "./Courseupdatation";
const ModuleDropdown = ({ module, viewLecture }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border rounded-lg shadow-sm mb-4 bg-white">
      <button
        className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 rounded-t-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-lg">{module.title}</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      {isOpen && (
        <div className="p-4">
          {module.lectures.length > 0 ? (
            module.lectures.map((lecture, index) => (
              <div
                key={index}
                className="py-2 border-b last:border-none hover:bg-gray-100"
              >
                <button
                  onClick={() => viewLecture(module._id, module.lectures)}
                  className="font-medium w-full text-left"
                >
                  {lecture.title}
                </button>
                <span className="block text-gray-500 text-sm">
                  Duration: {lecture.duration.toFixed(2)} mins
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No lectures available</p>
          )}
        </div>
      )}
    </div>
  );
};

const ViewStudentModules = () => {
  const { course_id } = useParams();
  console.log(course_id);
  const user_id = localStorage.getItem('user_id')
  const [modules, setModules] = useState([]);
  const navigate = useNavigate();
  const viewLecture = (module_id, lectures) => {
    console.log("Navigating with lectures:", lectures);
    if (user_id){
      navigate(`/student/${user_id}/${course_id}/${module_id}/view`, { state: { lectures } });
    } // Debugging step
    else{
      navigate('/login/student')
    }
  };
  const loadModules = useCallback(async () => {
    console.log("Fetching modules for course ID:", course_id);
    if (!course_id || course_id === "modules") {
        console.error("Invalid course_id detected!");
        return;
    }
    try {
      const response = await axios.get(`/courses/${course_id}/modules`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log("Modules fetched:", response.data);
      setModules(response.data.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
}, [course_id]);

  
// CourseDesc
const [course,setCourse] = useState({})
    const courseDetails = async ()=>{
      try {
        const response = await axios.get(`/courses/${course_id}/`,{
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        setCourse(response.data.data);
        const thumbnail = response.data.data.thumbnail;
        const desc = response.data.data.description;
        const title = response.data.data.title;
        setCourseTitle(title)
        setCourseThumbnail(thumbnail);
        setCourseDesc(desc);
      } catch (error) {
        console.log('error whilefetching course')
      }
    }
    

  useEffect(() => {
    loadModules();
    courseDetails()
  }, [course_id]); // Fix infinite re-rendering
  const handleEnrollClick = ()=>{}
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex-col items-center mb-4">

        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
        <h2 className="text-xl font-bold mb-2">{course.author}</h2>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleEnrollClick}
          >
          Enroll Now
        </button>
        </div>
        <img src={course.thumbnail} alt="" srcset="" className="w-full "/>
      </div>

      <h2 className="text-xl font-bold mb-4">Course Description</h2>
      <p>{course.description}</p>
      
    <div className="mb-4">
      <h2 className="text-2xl font-bold mb-2">Course Modules</h2>
      {modules.length > 0 ? (
        modules.map((module) => (
          <ModuleDropdown
            key={module._id}
            module={module}
            viewLecture={viewLecture}
          />
        ))
      ) : (
        <div>
          
          <p className="text-gray-500">No modules available</p>
        </div>
      )}
     </div>
    </div>
  );
};

export default ViewStudentModules;
