import React, { useState } from "react";
import ReactPlayer from "react-player";
import { useLocation } from "react-router-dom";
import {Card} from "flowbite-react";
import {Play} from "lucide-react"
const CLOUDINARY_CLOUD_NAME = "dc9lboron"; // Replace with your Cloudinary cloud name

const LectureAssig = () => {
  const location = useLocation();
  const { lectures = [] } = location.state || {};
  
  console.log("Received lectures:", lectures); // Debugging
  
  const [lectureUrl, setLectureUrl] = useState("");
  const [assignmentUrl, setAssignmentUrl] = useState("");
  // Function to generate Cloudinary URL from public_id
  const getCloudinaryUrl = (publicId) => {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload/${publicId}.mp4`;
  };

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <div className="bg-white border-r-2 border-black w-1/4 h-screen p-5 text-black flex justify-start items-start">
        <div className="text-left">
          <h2 className="text-xl font-semibold mb-4">Lectures and Assignments</h2>
          <div className="flex-col relative">
            {lectures.length > 0 ? (
              lectures.map((lecture) => (
                  <Card
                  key={lecture._id} className="mb-2 w-auto text-blue-500  gap-1"
                    onClick={() => setLectureUrl(getCloudinaryUrl(lecture.public_id))}
                  ><span> 
                    {lecture.title}
                  <Play />
                  </span>
                  </Card>
              ))
            ) : (
              <p className="text-gray-500">No lectures available</p>
            )}
          </div>
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
          />
        ) : (
          <p className="text-center text-gray-500">Select a lecture to play or assignment to view</p>
        )}
      </div>
    </div>
  );
};

export default LectureAssig;
