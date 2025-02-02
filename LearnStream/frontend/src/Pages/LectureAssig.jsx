import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";
import { Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Card } from "flowbite-react";
import axios from "../api/axios.js";
import PDFPreviewModal from "../components/PDFPreviewModal.jsx";

const CLOUDINARY_CLOUD_NAME = "dc9lboron";

const LectureAssig = () => {
  const location = useLocation();
  const { lectures = [], assignments = [], course_id } = location.state || {};
  const [lectureUrl, setLectureUrl] = useState("");
  const [currentLectureId, setCurrentLectureId] = useState(null);
  const [completedLectures, setCompletedLectures] = useState({});
  const [assignmentUrls, setAssignmentUrls] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null); // Stores the 
  const [selectedDiv,setSelectedDiv] = useState(null);
  const requestSent = useRef({});

  useEffect(() => {
    const fetchCompletedLectures = async () => {
      try {
        const response = await axios.get(`/courses/${course_id}/completed`);
        const completedLectureIds = response.data.completedLectures.map((lecture) => lecture.lectureId);
        const completedMap = completedLectureIds.reduce((acc, id) => {
          acc[id] = true;
          return acc;
        }, {});
        setCompletedLectures(completedMap);
      } catch (error) {
        console.error("Error fetching completed lectures:", error);
      }
    };

    if (course_id) {
      fetchCompletedLectures();
    }
  }, [course_id]);

  const handleSelectLecture = (lecture) => {
    setCurrentLectureId(lecture._id);
    setSelectedDiv("lecture")
    setLectureUrl(`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${lecture.public_id}.mp4`);
  };

  const handleSelectAssignment = (assignment) => {
    setSelectedDiv("assignment")
    setAssignmentUrls(
      assignment.public_id.map((url) => `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${url}.pdf`)
    );
  };

  return (
    <div className="flex">
      {/* Left Panel - Lecture & Assignment List */}
      <div className="bg-white border-r-2 border-black w-1/4 min-h-screen p-5 text-black">
        <h2 className="text-xl font-semibold mb-4">Lectures and Assignments</h2>
        
        {/* Lectures List */}
        <div className="flex-col relative">
          {lectures.length > 0 ? (
            lectures.map((lecture) => (
              <Card key={lecture._id} className="mb-2 w-auto text-blue-500 gap-1" onClick={() => handleSelectLecture(lecture)}>
                <input type="checkbox" checked={!!completedLectures[lecture._id]} readOnly />
                <span>{lecture.title} <Play /></span>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No lectures available</p>
          )}
        </div>

        {/* Assignments List */}
        <div className="flex-col relative">
          {assignments.length > 0 ? (
            assignments.map((assignment) => (
              <Card key={assignment._id} className="mb-2 w-auto text-blue-500 gap-1" onClick={() => handleSelectAssignment(assignment)}>
                <span>{assignment.title} <Play /></span>
              </Card>
            ))
          ) : (
            <p className="text-gray-500">No Assignments available</p>
          )}
        </div>
      </div>

      {/* Right Panel - Video Player and Assignments */}
      <div className="flex-1 p-4">
        {/* Video Player */}
        
        {selectedDiv=="lecture" && lectureUrl ? (
          <ReactPlayer
            url={lectureUrl}
            playing={false}
            loop={false}
            controls={true}
            width="100%"
            height="500px"
          />
        ) : (
          <p className="text-center text-gray-500">Select a lecture to play or an assignment to view</p>
        )}
          
        {/* Assignment PDF List */}
        
          {selectedDiv=="assignment" && assignmentUrls.length > 0 ? (
            assignmentUrls.map((url, index) => (
              <Card
                key={index}
                onClick={() => setSelectedPdfUrl(url)}
                className="block w-full text-left py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700 mb-2"
              >
                Assignment {index + 1}
              </Card>
            ))
          ) : (
            <p className="text-gray-500">Please Select an Assignment</p>
          )}
      

        {/* PDF Preview Modal */}
        {
        selectedPdfUrl && <PDFPreviewModal pdfUrl={selectedPdfUrl} onClose={() => setSelectedPdfUrl(null)} />}
      </div>
    </div>
  );
};

export default LectureAssig;
