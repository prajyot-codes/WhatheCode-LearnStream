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
          {/* Lectures Section */}
          {module.lectures.length > 0 ? (
            module.lectures.map((lecture, index) => (
              <div key={index} className="py-2 border-b last:border-none">
                <span className="font-medium">{lecture.title}</span>
                <span className="block text-gray-500 text-sm">
                  Duration: {lecture.duration.toFixed(2)} mins
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No lectures available</p>
          )}

          {/* Assignments Section */}
          {module.assignments.length > 0 ? (
            module.assignments.map((assignment, index) => (
              <div key={index} className="py-2 border-b last:border-none">
                <span className="font-medium">{assignment.title}</span>
                <span className="block text-gray-500 text-sm">
                  Deadline: {assignment.deadline}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No assignments available</p>
          )}

          {/* Delete Module Button */}
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
  const [open, setOpen] = useState(false);

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
          />
        ))
      ) : (
        <p className="text-gray-500">No modules available</p>
      )}

      {/* Add Module Button */}
      <button 
        onClick={() => setOpen(true)}
        className="bg-green-200 p-2 rounded-lg border border-stone-800 mt-4"
      >
        Add Modules
      </button>

      {/* Modal for Adding Module */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModuleForm />
      </Modal>
    </div>
  );
};

export default ViewtheModules;
