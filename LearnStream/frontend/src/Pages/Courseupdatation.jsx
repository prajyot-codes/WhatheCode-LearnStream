import React, { useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";

function ModuleForm() {
  const [modules, setModules] = useState([]);
  const { user_id, course_id } = useParams();

  // const addLectureToModule= async (moduleId) => {
  //   try{
  //     const response=await axios.post()
  //   }
  // }
  const handleAddModule = () => {
    setModules([
      ...modules,
      {
        id: modules.length + 1,
        name: "",
        lectures: [],
        assignments: [],
      },
    ]);
  };

  const handleDeleteModule = (id) => {
    setModules(modules.filter((module) => module.id !== id));
  };

  const handleInputChange = (moduleId, type, itemId, field, value) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              [type]:
                type === "name"
                  ? value
                  : module[type].map((item) =>
                      item.id === itemId ? { ...item, [field]: value } : item,
                    ),
            }
          : module,
      ),
    );
  };

  const handleAddLecture = (moduleId) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lectures: [
                ...module.lectures,
                { id: module.lectures.length + 1, title: "", file: null },
              ],
            }
          : module,
      ),
    );
  };

  const handleAddAssignment = (moduleId) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              assignments: [
                ...module.assignments,
                { id: module.assignments.length + 1, title: "", file: null },
              ],
            }
          : module,
      ),
    );
  };

  const handleDeleteLecture = (moduleId, lectureId) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              lectures: module.lectures.filter(
                (lecture) => lecture.id !== lectureId,
              ),
            }
          : module,
      ),
    );
  };

  const handleDeleteAssignment = (moduleId, assignmentId) => {
    setModules(
      modules.map((module) =>
        module.id === moduleId
          ? {
              ...module,
              assignments: module.assignments.filter(
                (assignment) => assignment.id !== assignmentId,
              ),
            }
          : module,
      ),
    );
  };

  const addLectureToModule = async (moduleId) => {
    try {
      // Iterate over all modules
      for (const module of modules) {
        // For each module, iterate over the lectures
        for (const lecture of module.lectures) {
          const formData = new FormData();
          formData.append("title", lecture.title);
          formData.append("videourl", lecture.file);

          // Sending a POST request for each lecture in the module
          const response = await axios.post(
            `/courses/${course_id}/modules/${moduleId}/lectures`, // Backend route for adding a lecture to a module
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );

          console.log("Lecture added to module:", response.data);
        }
      }

      alert("All lectures added successfully!");
    } catch (error) {
      console.error("Error adding lectures:", error);
      if (error.response) {
        alert(
          `Error: ${error.response.data.message || "Something went wrong"}`,
        );
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  // const moduleresponse=[];
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Map over the modules and send each one to the backend
      for (const module of modules) {
        const response = await axios.post(
          `/courses/${course_id}/modules`, // Backend route
          JSON.stringify({
            title: module.name,
            description: module.description || "", // Optional description
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        console.log("response obj", response);

        await addLectureToModule(response?.data?.data?._id);
        // console.log('Module added:', modules); // Log the server response for debugging
      }

      alert("Modules submitted successfully!");
    } catch (error) {
      console.error("Error adding modules:", error);
      if (error.response) {
        alert(
          `Error: ${error.response.data.message || "Something went wrong"}`,
        );
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center py-10"
      data-oid="vuebi0t"
    >
      <div
        className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8"
        data-oid="ojqv.vh"
      >
        <h1
          className="text-2xl font-bold text-gray-800 mb-6"
          data-oid="15.es88"
        >
          Module Form
        </h1>
        <form onSubmit={handleSubmit} data-oid="vq:wo2k">
          {modules.map((module) => (
            <div
              key={module.id}
              className="border border-gray-300 rounded-lg p-4 mb-6 bg-gray-50 relative"
              data-oid="dqe7ew3"
            >
              <h3
                className="text-lg font-semibold text-gray-700 mb-4"
                data-oid="wj2ws-c"
              >
                Module {module.id}
              </h3>
              <button
                type="button"
                onClick={() => handleDeleteModule(module.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                data-oid="v06q-yq"
              >
                ✖
              </button>
              <div className="mb-4" data-oid="-nwm-fv">
                <label
                  className="block text-sm font-medium text-gray-600 mb-1"
                  data-oid="o1cashp"
                >
                  Module Name
                </label>
                <input
                  type="text"
                  value={module.name}
                  onChange={(e) =>
                    handleInputChange(
                      module.id,
                      "name",
                      null,
                      null,
                      e.target.value,
                    )
                  }
                  placeholder="Enter module name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  data-oid="ooblw9c"
                />
              </div>
              <div className="mb-6" data-oid="dhkx-r2">
                <h4
                  className="text-md font-semibold text-gray-600 mb-2"
                  data-oid="dzkvlx-"
                >
                  Lectures
                </h4>
                {module.lectures.map((lecture) => (
                  <div key={lecture.id} className="mb-4" data-oid="6escc:3">
                    <div className="flex items-center mb-2" data-oid="amoo9th">
                      <input
                        type="text"
                        value={lecture.title}
                        onChange={(e) =>
                          handleInputChange(
                            module.id,
                            "lectures",
                            lecture.id,
                            "title",
                            e.target.value,
                          )
                        }
                        placeholder="Lecture Title"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        data-oid=":5f3d5t"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteLecture(module.id, lecture.id)
                        }
                        className="ml-2 text-red-500 hover:text-red-700"
                        data-oid="br5kmcs"
                      >
                        ✖
                      </button>
                    </div>
                    <input
                      type="file"
                      onChange={(e) =>
                        handleInputChange(
                          module.id,
                          "lectures",
                          lecture.id,
                          "file",
                          e.target.files[0],
                        )
                      }
                      className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                      data-oid="jhd2sq-"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddLecture(module.id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  data-oid=":fd9obn"
                >
                  Add Lecture
                </button>
              </div>
              <div data-oid="eqqa78u">
                <h4
                  className="text-md font-semibold text-gray-600 mb-2"
                  data-oid="s59q6u3"
                >
                  Assignments
                </h4>
                {module.assignments.map((assignment) => (
                  <div key={assignment.id} className="mb-4" data-oid="6y0x1._">
                    <div className="flex items-center mb-2" data-oid="ldjj-rk">
                      <input
                        type="text"
                        value={assignment.title}
                        onChange={(e) =>
                          handleInputChange(
                            module.id,
                            "assignments",
                            assignment.id,
                            "title",
                            e.target.value,
                          )
                        }
                        placeholder="Assignment Title"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        data-oid=":i-hq-h"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteAssignment(module.id, assignment.id)
                        }
                        className="ml-2 text-red-500 hover:text-red-700"
                        data-oid="5ju-yl-"
                      >
                        ✖
                      </button>
                    </div>
                    <input
                      type="file"
                      onChange={(e) =>
                        handleInputChange(
                          module.id,
                          "assignments",
                          assignment.id,
                          "file",
                          e.target.files[0],
                        )
                      }
                      className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
                      data-oid="0ix5bn5"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => handleAddAssignment(module.id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  data-oid="o-6z.jk"
                >
                  Add Assignment
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between" data-oid="j0mbl9j">
            <button
              type="button"
              onClick={handleAddModule}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              data-oid="tbdlvbl"
            >
              Add Module
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              data-oid="ohoe24f"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModuleForm;
