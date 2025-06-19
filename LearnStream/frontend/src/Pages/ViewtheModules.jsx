  import React, { useState, useEffect, useCallback } from "react";
  import { ChevronDown, ChevronUp } from "lucide-react";
  import axios from "../api/axios";
  import { useParams, useNavigate } from "react-router-dom";
  import Modal from "./Modal";
  import ModuleForm from "./Courseupdatation";
  import LectureAssignment from "../components/LectureAssignment";
  // Assuming your custom logo is imported here
  import CustomLogo from "../../public/assets/lectureLogo"; // Update path as necessary
  import AssignmentIcon from "../../public/assets/assignmentsvg";

  const ModuleDropdown = ({
    module,
    deleteModule,
    deleteAssignment,
    deletelecture,
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user_id, course_id } = useParams();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const changepage = (assignmentId) => {
      navigate(`${assignmentId}`);
    };
    const [ownerId, setOwnerId] = useState(null);
    let owner_id
    const owner = async (course_id) => {
      try {
        // console.log(course_id)
        const response = await axios.get(`/courses/${course_id}/getTeacher`,{
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
        // console.log(response)
          // console.log(response.data.data.author ==user_id )
          
        return response.data.data.author; // Access `.author` from returned object
      } catch (error) {
        console.error("Error fetching teacher elllo:", error);
        throw error;
      }
    };

    useEffect(() => {
      const getOwner = async () => {
        try {
          const authorId = await owner(course_id); // This is a string
          setOwnerId(authorId); // No `.author` needed
          console.log(owner_id)
          console.log(owner_id==user_id);
          
        } catch (error) {
          console.error("Failed to fetch course owner:", error);
        }
      };

      if (course_id) {
        getOwner();
      }
    }, [course_id]);

    return (
      <div className="border rounded-lg shadow-sm mb-4 bg-white">
        <button
          className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-semibold text-lg">{module.title}</span>
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {isOpen && (
          <div className="p-4">
            {/* Lectures Section */}
            {module.lectures.length > 0 ? (
              module.lectures.map((lecture, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start py-2 border-b last:border-none"
                >
                  {/* Left side: Custom Logo, Lecture Title & Duration */}
                  <div className="flex flex-col">
                    {/* Custom Logo */}
                    <div className="flex items-center gap-2">
                      <CustomLogo size={25} color="gray" />{" "}
                      {/* Your Custom Logo */}
                      <span className="font-medium block">{lecture.title}</span>
                    </div>

                    {/* Duration */}
                    <div className="text-gray-500 text-sm mt-1">
                      Duration: {lecture.duration.toFixed(2)} mins
                    </div>
                  </div>

                  {/* Right side: Delete (X) */}
                  {  ownerId==user_id &&
                    <button
                      onClick={() => deletelecture(module._id, lecture._id)} // Correctly call deletelecture
                      className="text-red-500 cursor-pointer hover:text-red-700"
                    >
                      ✖
                    </button>
                  }
                </div>
              ))
            ) : (
              <p className="text-gray-500">No lectures available</p>
            )}

            {/* Assignments Section */}
            {module.assignments.length > 0 ? (
              module.assignments.map((assignment, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start py-2 border-b last:border-none"
                >
                  {/* Left side: Icon, Title & Deadline */}
                  <div
                    onClick={() => {
                      changepage(assignment._id);
                    }}
                    className="flex flex-col "
                  >
                    {/* Icon and Title */}
                    <div className="flex items-center gap-2">
                      <AssignmentIcon size={20} color="gray" />
                      <span className="font-medium block">
                        {assignment.title}
                      </span>
                    </div>

                    {/* Deadline below the Title */}
                    {assignment.deadline ? (
                      <span className="text-gray-500 text-sm mt-1">
                        Deadline:{" "}
                        {
                          new Date(assignment.deadline)
                            .toISOString()
                            .split("T")[0]
                        }
                      </span>
                    ) : (
                      <span className="text-gray-500 text-sm mt-1">
                        No due date
                      </span>
                    )}
                  </div>

                  {/* Right side: Delete (X) */}
                  { user_id==ownerId &&(
                    <button
                      onClick={() => deleteAssignment(module._id, assignment._id)}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                    >
                      ✖
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No assignments available</p>
            )}

            {/* Delete Module Button */}
            <div className="flex justify-between">
              {user_id==ownerId && (
                <button
                  onClick={() => deleteModule(module._id)}
                  className="p-1 m-1 rounded-lg bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Delete
                </button>
              )}
              {user_id==owner_id && (
                <button
                  onClick={() => setOpen(true)}
                  className="p-1 m-1 w-auto rounded-lg bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                >
                  Add lecture-assignment
                </button>
              )}
              <Modal open={open} onClose={() => setOpen(false)}>
                <LectureAssignment moduleId={module._id} />
              </Modal>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ViewtheModules = () => {
    const [modules, setModules] = useState([]);
    const { user_id, course_id } = useParams();
    const [ownerId, setOwnerId] = useState(null);
    let owner_id
    const owner = async (course_id) => {
      try {
        // console.log(course_id)
        const response = await axios.get(`/courses/${course_id}/getTeacher`,{
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          })
        // console.log(response)
          // console.log(response.data.data.author ==user_id )
          
        return response.data.data.author; // Access `.author` from returned object
      } catch (error) {
        console.error("Error fetching teacher elllo:", error);
        throw error;
      }
    };

    useEffect(() => {
      const getOwner = async () => {
        try {
          const authorId = await owner(course_id); // This is a string
          setOwnerId(authorId); // No `.author` needed
          console.log(owner_id)
          owner_id=authorId
          console.log(owner_id==user_id);
          
        } catch (error) {
          console.error("Failed to fetch course owner:", error);
        }
      };

      if (course_id) {
        getOwner();
      }
    }, [course_id]);

    const deleteModule = async (module_id) => {
      try {
        await axios.delete(`/courses/${course_id}/modules/${module_id}`);
        setModules((prevModules) =>
          prevModules.filter((module) => module._id !== module_id)
        );
      } catch (error) {
        console.error("Error deleting module:", error);
      }
    };

    const deletelecture = async (moduleId, lectureId) => {
      try {
        await axios.delete(
          `/courses/${course_id}/modules/${moduleId}/lectures/${lectureId}`
        );

        // Update the modules state after deletion
        setModules((prevModules) =>
          prevModules.map((module) =>
            module._id === moduleId
              ? {
                  ...module,
                  lectures: module.lectures.filter((a) => a._id !== lectureId),
                }
              : module
          )
        );
        window.location.reload();
      } catch (error) {
        console.error("Error deleting lecture:", error);
      }
    };

    const deleteAssignment = async (moduleId, assignmentId) => {
      try {
        await axios.delete(
          `/courses/${course_id}/modules/${moduleId}/assignments/${assignmentId}`
        );

        // Update the modules state after deletion
        setModules((prevModules) =>
          prevModules.map((module) =>
            module._id === moduleId
              ? {
                  ...module,
                  assignments: module.assignments.filter(
                    (a) => a._id !== assignmentId
                  ),
                }
              : module
          )
        );
        // window.location.reload();
      } catch (error) {
        console.error("Error deleting assignment:", error);
      }
    };

    const loadModules = useCallback(async () => {
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

    useEffect(() => {
      loadModules();
    }, [course_id, loadModules]);

    const [open, setOpen] = useState(false);
    return (
      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Course Modules</h1>

        {/* Modules List */}
        {modules.length > 0 ? (
          modules.map((module) => (
            <ModuleDropdown
              key={module._id}
              module={module}
              deleteModule={deleteModule}
              deleteAssignment={deleteAssignment}
              deletelecture={deletelecture}
            />
          ))
        ) : (
          <p className="text-gray-500">No modules available</p>
        )}

        {/* ✅ Conditionally render Add Modules button only for owner */}
        {user_id==ownerId ? (
          <button
            onClick={() => setOpen(true)}
            className="bg-green-200 p-2 rounded-lg border border-stone-800 mt-4"
          >
            Add Modules
          </button>
        ):null}

        {/* Modal for Adding Module */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModuleForm />
        </Modal>
      </div>
    );
  };

  export default ViewtheModules;
