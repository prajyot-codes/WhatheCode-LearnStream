import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Card } from "flowbite-react";
import { Play } from "lucide-react";
import axios from "../api/axios.js";

const CLOUDINARY_CLOUD_NAME = "dc9lboron";

const AssignmentComponent = ({ assignments, course_id }) => {
  const [assignmentUrls, setAssignmentUrls] = useState([]);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);
  const [assignmentDeadline, setAssignmentDeadline] = useState(null);
  const [completedAssignments, setCompletedAssignments] = useState({});
  const requestSent = useRef({});

  useEffect(() => {
    const fetchCompletedAssignments = async () => {
      try {
        console.log(course_id)
        const response = await axios.get(`/courses/${course_id}/completed`);
        const completedAssignmentIds = response.data.completedAssignments.map(assignment => assignment.assignmentId);
        const completedMap = completedAssignmentIds.reduce((acc, id) => {
          acc[id] = true;
          return acc;
        }, {});
        setCompletedAssignments(completedMap);
      } catch (error) {
        console.error("Error fetching completed assignments:", error);
      }
    };

    if (course_id) {
      fetchCompletedAssignments();
    }
  }, [course_id]);

  const handleProgress = ({ playedSeconds }) => {
    if (
      !completedLectures[currentAssignmentId] &&
      !requestSent.current[currentAssignmentId]
    ) 
    {
      sendCompletionRequest(currentAssignmentId);
      requestSent.current[currentAssignmentId] = true;
    }
  };

  const sendCompletionRequest = async (assignmentId) => {
    try {
      const response = await axios.post(`/courses/${course_id}/assignments/${assignmentId}/complete`);
      if (response.status === 200) {
        setCompletedAssignments((prev) => ({
          ...prev,
          [assignmentId]: true,
        }));
      }
    } catch (error) {
      console.error("Error marking assignment as completed:", error);
    }
  };

  const handleSelectAssignment = (assignment) => {
    setCurrentAssignmentId(assignment._id);
    setAssignmentUrls(assignment.public_id.map((Url)=>{
        return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${Url}.pdf`
    }));
  };

  return (
    <div className="flex">
      {/* Lecture List */}
      <div className="bg-white border-r-2 border-black w-1/4 min-h-screen p-5 text-black">
        <h2 className="text-xl font-semibold mb-4">Lectures and Assignments</h2>
        <div className="flex-col relative">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <Card key={assignment._id} className="mb-2 w-auto text-blue-500 gap-1" onClick={() => handleSelectAssignment(assignment)}>
                <input type="checkbox" checked={!!completedAssignments[assignment._id]} readOnly />
                <span>{assignment.title} <Play /></span>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No Assignments available</p>
          )}
        </div>
      </div>

      {/* Assignment Page Stuf preview markdone */}
      <div className="flex-1 p-4">
        {/* {lectureUrl ? (
          <ReactPlayer
            url={lectureUrl}
            playing={false}
            loop={false}
            controls={true}
            width="100%"
            height="500px"
            onProgress={handleProgress}
            onDuration={setVideoDuration}
          />
        ) : (
          <p className="text-center text-gray-500">Select a lecture to play or assignment to view</p>
        )} */}
      </div>
    </div>
  );
};

export default AssignmentComponent;
