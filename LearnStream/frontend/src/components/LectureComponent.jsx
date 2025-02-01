import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Card } from "flowbite-react";
import { Play } from "lucide-react";
import axios from "../api/axios.js";

const CLOUDINARY_CLOUD_NAME = "dc9lboron";

const LectureComponent = ({ lectures, course_id }) => {
  const [lectureUrl, setLectureUrl] = useState("");
  const [currentLectureId, setCurrentLectureId] = useState(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [completedLectures, setCompletedLectures] = useState({});
  const requestSent = useRef({});

  useEffect(() => {
    const fetchCompletedLectures = async () => {
      try {
        console.log(course_id)
        const response = await axios.get(`/courses/${course_id}/completed`);
        const completedLectureIds = response.data.completedLectures.map(lecture => lecture.lectureId);
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

  const handleProgress = ({ playedSeconds }) => {
    if (
      videoDuration > 0 &&
      playedSeconds / videoDuration >= 0.9 &&
      !completedLectures[currentLectureId] &&
      !requestSent.current[currentLectureId]
    ) {
      sendCompletionRequest(currentLectureId);
      requestSent.current[currentLectureId] = true;
    }
  };

  const sendCompletionRequest = async (lectureId) => {
    try {
      const response = await axios.post(`/courses/${course_id}/lectures/${lectureId}/complete`);
      if (response.status === 200) {
        setCompletedLectures((prev) => ({
          ...prev,
          [lectureId]: true,
        }));
      }
    } catch (error) {
      console.error("Error marking lecture as completed:", error);
    }
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLectureId(lecture._id);
    setLectureUrl(`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${lecture.public_id}.mp4`);
  };

  return (
    <div className="flex">
      {/* Lecture List */}
      <div className="bg-white border-r-2 border-black w-1/4 min-h-screen p-5 text-black">
        <h2 className="text-xl font-semibold mb-4">Lectures and Assignments</h2>
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
      </div>

      {/* Video Player */}
      <div className="flex-1 p-4">
        {lectureUrl ? (
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
        )}
      </div>
    </div>
  );
};

export default LectureComponent;
