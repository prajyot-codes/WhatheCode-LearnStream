import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from "../api/axios";

function UploadedAssignment() {
  const [assignments, setAssignments] = useState([]);
  const { course_id, assignmentId } = useParams();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [title, settitle] = useState("")
  const handleDownload = (urls) => {
    // Handle downloading all files in the submittedAssignmentUrls array
    urls.forEach((url) => {
      console.log(`Downloading file from ${url}`);
      // Implement actual download logic here
      // For example, open the URL in a new tab:
      window.open(url, '_blank');
    });
  };

  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const loadAssignment = async () => {
    try {
      const response = await axios.get(`/courses/${course_id}/assignment/${assignmentId}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      console.log(response);
      settitle(response.data.data.assignmentTitle)
      // Adjust the state based on the response structure
      setAssignments(response.data.data.uploadedAssignments);
    } catch (error) {
      console.log(error);
    }
  };

  // Call loadAssignment when component mounts
  useEffect(() => {
    loadAssignment();
  }, [course_id, assignmentId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>

      {/* List of uploaded assignments */}
      <div className="space-y-4">
        {assignments.map((assignment, index) => (
          <div key={index} className="border rounded-lg shadow-sm mb-4 bg-white">
            <button
              className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200"
              onClick={() => toggleDropdown(index)}
            >
              <span className="font-semibold text-lg">{assignment.studentName}</span>
              {openDropdown === index ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>

            {openDropdown === index && (
              <div className="p-4">
                {/* Display Assignment Title */}
                <div className="flex justify-between items-center py-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-800">{assignment.assignmentTitle}</span>
                    <span className="text-sm text-gray-500">Uploaded on: {new Date(assignment.uploadedAt).toLocaleDateString()}</span>
                  </div>
                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(assignment.submittedAssignmentUrls)}
                    className="text-blue-500 cursor-pointer hover:text-blue-700"
                  >
                    Download
                  </button>
                </div>

                {/* Display all the URLs */}
                <div className="mt-2">
                  {assignment.submittedAssignmentUrls.map((url, idx) => (
                    <div key={idx} className="text-blue-500 hover:text-blue-700">
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {`File ${idx + 1}`}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadedAssignment;
