import axios from "../api/axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function LectureAssignmentForm({ moduleId }) {
  const [lectures, setLectures] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const { course_id } = useParams();

  const handleAddLecture = () => {
    setLectures([...lectures, { id: lectures.length + 1, title: "", file: null }]);
  };

  const handleAddAssignment = () => {
    setAssignments([...assignments, { id: assignments.length + 1, title: "", deadline: "", file: null }]);
  };

  const handleInputChange = (id, type, field, value) => {
    if (type === "lectures") {
      setLectures(lectures.map((lecture) => (lecture.id === id ? { ...lecture, [field]: value } : lecture)));
    } else {
      setAssignments(assignments.map((assignment) => (assignment.id === id ? { ...assignment, [field]: value } : assignment)));
    }
  };

  const handleDeleteLecture = (id) => {
    setLectures(lectures.filter((lecture) => lecture.id !== id));
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!moduleId) {
      alert("Module ID is missing!");
      return;
    }

    try {
      // Submit Lectures
      for (const lecture of lectures) {
        const formData = new FormData();
        formData.append("title", lecture.title);
        formData.append("videourl", lecture.file);

        await axios.post(
          `/courses/${course_id}/modules/${moduleId}/lectures`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      // Submit Assignments
      for (const assignment of assignments) {
        const formData = new FormData();
        formData.append("title", assignment.title);
        formData.append("deadline", assignment.deadline);
        formData.append("assignmentFiles", assignment.file);

       const response= await axios.post(
          `/courses/${course_id}/modules/${moduleId}/assignments`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        console.log(response);
      }

      alert("Lectures and Assignments submitted successfully!");
      
      // window.location.reload();
    } catch (error) {
      console.error("Error submitting lectures/assignments:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Lecture & Assignment Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Lectures Section */}
        <div className="mb-6">
          <h4 className="text-md font-semibold text-gray-600 mb-2">Lectures</h4>
          {lectures.map((lecture) => (
            <div key={lecture.id} className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  value={lecture.title}
                  onChange={(e) => handleInputChange(lecture.id, "lectures", "title", e.target.value)}
                  placeholder="Lecture Title"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="button" onClick={() => handleDeleteLecture(lecture.id)} className="ml-2 text-red-500 hover:text-red-700">✖</button>
              </div>
              <input
                type="file"
                onChange={(e) => handleInputChange(lecture.id, "lectures", "file", e.target.files[0])}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddLecture} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add Lecture</button>
        </div>

        {/* Assignments Section */}
        <div>
          <h4 className="text-md font-semibold text-gray-600 mb-2">Assignments</h4>
          {assignments.map((assignment) => (
            <div key={assignment.id} className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  value={assignment.title}
                  onChange={(e) => handleInputChange(assignment.id, "assignments", "title", e.target.value)}
                  placeholder="Assignment Title"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="date"
                  value={assignment.deadline}
                  onChange={(e) => handleInputChange(assignment.id, "assignments", "deadline", e.target.value)}
                  className="ml-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="button" onClick={() => handleDeleteAssignment(assignment.id)} className="ml-2 text-red-500 hover:text-red-700">✖</button>
              </div>
              <input
                type="file"
                onChange={(e) => handleInputChange(assignment.id, "assignments", "file", e.target.files[0])}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          ))}
          <button type="button" onClick={handleAddAssignment} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add Assignment</button>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-6">
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default LectureAssignmentForm;
