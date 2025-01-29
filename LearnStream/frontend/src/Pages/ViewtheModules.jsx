import React, { useState, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import ModuleForm from "./Courseupdatation";

const ModuleDropdown = ({ module, deleteModule }) => {
  const [isOpen, setIsOpen] = useState(false);
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
          {module.lectures.length > 0 ? (
            module.lectures.map((lecture, index) => (
              <div key={index} className="py-2 border-b last:border-none">
                <span className="font-medium">{lecture.title}</span>
                {/* <button
                type="button"
                onClick={() => handleDeleteModule(module.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                ✖
              </button> */}
                <span className="block text-gray-500 text-sm">
                  Duration: {lecture.duration.toFixed(2)} mins
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No lectures available</p>
          )}
          <button
            onClick={() => deleteModule(module._id)}
            className="p-1 m-1 rounded-lg bg-white border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

const ViewtheModules = () => {
  const { course_id } = useParams();
  const [modules, setModules] = useState([]);

  const deleteModule = async (module_id) => {
    try {
      await axios.delete(`/courses/${course_id}/modules/${module_id}`);
      setModules((prevModules) =>
        prevModules.filter((module) => module._id !== module_id)
      ); // Update state
    } catch (error) {
      console.error("Error deleting module:", error);
    }
  };

  const loadModules = useCallback(async () => {
    try {
      const response = await axios.get(`/courses/${course_id}/modules`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setModules(response.data.data); // Accessing `data` inside `response`
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  }, [course_id]);

  useEffect(() => {
    loadModules();
  }, [course_id]); // Fix infinite re-rendering
  const [open, setOpen] = useState(false)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Course Modules</h1>
      {modules.length > 0 ? (
        modules.map((module) => (
          <ModuleDropdown
            key={module._id}
            module={module}
            deleteModule={deleteModule}
          />
        ))
      ) : (
        <div>
          <button onClick={() => {
            setOpen(true);
          }} className="bg-green-200 p-1 rounded-lg border-stone-800 border ">
            Add Modules
          </button>
          <p className="text-gray-500">No modules available</p>
        </div>
      )}
    <Modal open={open} onClose={()=>{setOpen(false)}}>
        <ModuleForm/>
    </Modal>
    </div>
  );
};

export default ViewtheModules;
