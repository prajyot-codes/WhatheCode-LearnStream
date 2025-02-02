import React, { useEffect, useState } from "react";
import { Button, Modal, FileInput } from "flowbite-react";
import axios from "../api/axios.js";

const YourWork = ({ courseId, assignmentId, deadline }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadedAssignmentUrls, setUploadedAssignmentUrls] = useState([]);

  // Fetch uploaded assignments when component mounts
  useEffect(() => {
    const fetchUploadedAssignments = async () => {
      try {
        const response = await axios.get(`/courses/${courseId}/assignments/${assignmentId}`, {
          withCredentials: true,
        });
        const uploadedAssignments = response.data.data.uploadedAssignments;
        const urls = uploadedAssignments.map((assignment) => assignment.submittedAssignmentUrls).flat();
        setUploadedAssignmentUrls(urls);
      } catch (error) {
        console.error("Error fetching uploaded assignments:", error);
      }
    };
  
    fetchUploadedAssignments();
  }, [courseId, assignmentId]);
  

  // Handle file selection
  const handleFileChange = (event) => {
    setSelectedFiles([...event.target.files]);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      alert("Please select at least one file to upload!");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("submissionFiles", file);
    });
    formData.append("deadline", deadline);

    try {
      await axios.post(`/courses/${courseId}/assignments/${assignmentId}/upload`, formData, {
        withCredentials: true
      });
      alert("Files uploaded successfully!");
      setSelectedFiles([]);
      setIsModalOpen(false);

      // Refresh uploaded assignments list
      const response = await axios.get(`/courses/${courseId}/assignments/${assignmentId}/submissions`);
      setUploadedAssignmentUrls(response.data);
    } catch (error) {
      console.error("Error uploading files:", error);
      // alert("Failed to upload files.");
    }
  };

  // Handle marking lecture as done
  const markAsDone = async (assignmentId) => {
    try {
      const response = await axios.post(`/courses/${courseId}/assignments/${assignmentId}/complete`, {},{
        withCredentials: true
      });
      
      // Refresh uploaded assignments list
      if (response.data.data == true){
        alert("Marked as done!");

      }
      // setUploadedAssignmentUrls(response.data.data);
    } catch (error) {
      console.error("Error marking as done:", error);
      alert("Failed to mark as done.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md gap-4 text-center">
      <h3 className="text-lg font-semibold mb-4">Your Work</h3>

      {/* Display uploaded assignments */}
      {uploadedAssignmentUrls?.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold">Uploaded Assignments:</h4>
          <ul className="list-disc ml-6 gap-4">
            {uploadedAssignmentUrls.map((url, index) => (
              <li key={index} className="text-sm text-gray-600 flex justify-between gap-4 items-center">
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  Assignment {index + 1}
                </a>
                
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Add Files Button */}
      <Button onClick={() => setIsModalOpen(true)} color="blue" size="lg" 
        className="mb-3">
        Add Files
      </Button>

      <Button color="green" size="lg" onClick={() => markAsDone(assignmentId)}>
                  Mark as Done
      </Button>
      {/* Modal for File Upload */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="lg">
        <Modal.Header>Upload Assignments</Modal.Header>
        <Modal.Body>
          <FileInput onChange={handleFileChange} multiple />
          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">Selected Files:</p>
              <ul className="list-disc ml-6">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleUpload} color="blue">
            Upload
          </Button>
          <Button onClick={() => setIsModalOpen(false)} color="gray">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default YourWork;
