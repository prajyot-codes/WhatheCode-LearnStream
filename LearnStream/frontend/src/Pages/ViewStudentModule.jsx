import { useState, useEffect, useCallback, useContext } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Progress } from "flowbite-react";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import EnrollButton from "../components/EnrollButton";
import BackButton from "../components/BackButton";
import AddToCartBtn from "../components/AddToCartBtn";
import AuthContext from "../contexts/AuthProvider";
import BuyCourseButton from "./Payment";

const ModuleDropdown = ({ module, viewResources }) => {
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
                  onClick={() =>
                    viewResources(module._id, module.lectures, module.assignments)
                  }
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

          <br />
          {module.assignments.length > 0 ? (
            module.assignments.map((assignment, index) => (
              <div
                key={index}
                className="py-2 border-b last:border-none hover:bg-gray-100"
              >
                <button
                  onClick={() =>
                    viewResources(module._id, module.lectures, module.assignments)
                  }
                  className="font-medium w-full text-left"
                >
                  {assignment.title}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No assignments available</p>
          )}
        </div>
      )}
    </div>
  );
};

const ViewStudentModules = () => {
  const { course_id } = useParams();
  const { auth } = useContext(AuthContext);
  const [enrolled, setEnroll] = useState(false);
  const { user_id } = auth;
  const [modules, setModules] = useState([]);
  const [course, setCourse] = useState({});
  const [CourseProgress, setCourseProgress] = useState(0);
  const [completedLectures, setCompletedLectures] = useState(0);
  const [completedAssignments, setCompletedAssignments] = useState(0);
  const [totalLectures, setTotalLectures] = useState(0);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const navigate = useNavigate();
  const [isDisabled,setIsDisabled] =  useState(false);
  const token = auth?.accessToken
    const checkEnrolled = async () => {
      try {
        const response = await axios.get(`/courses/${course_id}/enrolled`, {
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}` 
          },
          withCredentials: true,
        });
  
        console.log(response.data.data);
        // setEnrolled(response.data.data);
        setEnroll(response.data.data); // ✅ Store boolean value in state
  
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      
          checkEnrolled();
      // console.log("prajyot");
      
    }, [token,course_id]); // ✅ Run only once when component mounts
  const viewResources = (module_id, lectures, assignments) => {
    if (enrolled) {
      navigate(`/student/${user_id}/${course_id}/${module_id}/view`, {
        state: { course_id, lectures, assignments },
      });
    } else {
      alert(`Please enroll to view resources`);
    }
  };

  const loadModules = useCallback(async () => {
    if (!course_id || course_id === "modules") return;
    try {
      const response = await axios.get(`/courses/${course_id}/modules`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setModules(response.data.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  }, [course_id]);

  const courseDetails = async () => {
    try {
      const response = await axios.get(`/courses/${course_id}/`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log(response.data.data);
      setCourse(response.data.data);
    } catch (error) {
      console.error("Error while fetching course");
    }
  };

  const courseProgressDetails = async () => {
    try {
      const response = await axios.get(`/courses/${course_id}/progress`, {
        withCredentials: true,
      });
      const progress = response.data.data;
      setCourseProgress(progress.progressPercentage);
      setCompletedLectures(progress.completedLecturesCount);
      setCompletedAssignments(progress.completedAssignmentsCount);
      setTotalLectures(progress.totalLectures);
      setTotalAssignments(progress.totalAssignments);
    } catch (error) {
      console.error("Course Progress error", error);
    }
  };

  useEffect(() => {
    loadModules();
    courseDetails();
    courseProgressDetails();
  }, [course_id]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div className="flex flex-col">
          <BackButton />
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{course.title}</h1>
          <h2 className="text-lg sm:text-xl font-semibold mb-2">
            Instructor: {course?.author?.name || "someone"}
          </h2>

          {/* Action Buttons */}
          {user_id && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {/* <EnrollButton course_id={course_id}  /> */}
              <AddToCartBtn course_id={course_id} enrolled = {enrolled} />
              <BuyCourseButton course_id={course_id} amount={course?.price} enrolled = {enrolled} />
            </div>
          )}
        </div>

        <img
          src={course.thumbnail}
          alt="Course Thumbnail"
          className="w-full w-60 rounded-lg shadow-md"
        />
      </div>

      {/* Description */}
      <h2 className="text-xl font-bold mb-2">Course Description</h2>
      <p className="mb-4">{course.description}</p>

      {/* Progress */}
      <h2 className="text-xl font-bold mb-2">Course Progress</h2>
      <p className="font-semibold">
        Lectures completed {completedLectures}/{totalLectures}
      </p>
      <p className="font-semibold mb-2">
        Assignments completed {completedAssignments}/{totalAssignments}
      </p>
      <div className="mb-4">
        {CourseProgress !== undefined ? CourseProgress.toFixed(2) + "%" : "0.00%"}
        <Progress
          progress={CourseProgress || 0}
          label={`${Math.round(CourseProgress || 0)}% Completed`}
        />
      </div>

      {/* Modules */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Course Modules</h2>
        {modules.length > 0 ? (
          modules.map((module) => (
            <ModuleDropdown
              key={module._id}
              module={module}
              viewResources={viewResources}
            />
          ))
        ) : (
          <p className="text-gray-500">No modules available</p>
        )}
      </div>
    </div>
  );
};

export default ViewStudentModules;
