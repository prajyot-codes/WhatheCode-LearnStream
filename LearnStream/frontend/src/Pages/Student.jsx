// import React from 'react';
// import { useParams } from 'react-router-dom';

// const videos = [
//   {
//     id: 1,
//     title: "Advanced React",
//     src: "/assets/videos/video2.mp4", // Update with your actual local file path
//   },
//   {
//     id: 2,
//     title: "Advanced JavaScript",
//     src: "/assets/videos/video2.mp4", // Update with your actual local file path
//   },
// ];

// const Student = () => {
//   const { user_id } = useParams();

//   return (
//     <div>
//       {/* Offers Section */}
//       <div className="bg-gray-300 p-9 text-center text-xl font-semibold">
//         Offers regarding courses
//       </div>

//       {/* My Learning Section */}
//       <div className="p-6">
//         <h3 className="text-2xl font-semibold mb-4">My Learning</h3>
//         <div className="flex flex-wrap gap-6">
//           {videos.map((video) => (
//             <div
//               key={video.id}
//               className="bg-gray-100 rounded-lg p-4 shadow-md w-64 h-auto flex flex-col items-center"
//             >
//               {/* Video Player */}
//               <video controls className="w-full rounded">
//                 <source src={video.src} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//               {/* Video Title */}
//               <p className="font-bold text-lg mt-2">{video.title}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Top Courses Section */}
//       <div className="p-6">
//         <h3 className="text-2xl font-semibold mb-4">Top Courses</h3>
//         <div className="flex gap-6">
//           {videos.map((video) => (
//             <div
//               key={video.id}
//               className="bg-gray-100 rounded-lg p-4 shadow-md w-64 h-auto flex flex-col items-center"
//             >
//               {/* Video Player */}
//               <video controls className="w-full rounded">
//                 <source src={video.src} type="video/mp4" />
//                 Your browser does not support the video tag.
//               </video>
//               {/* Video Title */}
//               <p className="font-bold text-lg mt-2">{video.title}</p>
//             </div>
//           ))}

//           {/* Example Courses */}
//           <div className="bg-gray-100 rounded-lg w-64 h-40 flex items-center justify-center shadow-md">
//             <p className="text-lg font-bold">Your First Course</p>
//           </div>
//           <div className="bg-gray-100 rounded-lg w-64 h-40 flex items-center justify-center shadow-md">
//             <p className="text-lg font-bold">Your First Course</p>
//           </div>
//           <div className="bg-gray-100 rounded-lg w-64 h-40 flex items-center justify-center shadow-md">
//             <p className="text-lg font-bold">Your First Course</p>
//           </div>
//         </div>
//       </div>

//       {/* Welcome Student Section */}
//       <section>
//         <h1>Welcome Student {user_id}, you are logged in!</h1>
//       </section>
//     </div>
//   );
// };

// export default Student;
import React from "react";
import { useParams } from 'react-router-dom';

const videos = [
    {
      id: 1,
      title: "Advanced React",
      src: "/assets/videos/video2.mp4", // Update with your actual local file path
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      src: "/assets/videos/video2.mp4", // Update with your actual local file path
    },
  ];
  
  const Student = () => {
    const { user_id } = useParams();
    return (
      
      <div>
        {/* Navbar */}
        {/* <Component /> */}
  
        {/* Offers Section */}
        <div className="bg-gray-300 p-9 text-center text-xl font-semibold">
          Offers regarding courses
        </div>
  
        {/* My Learning Section */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">My Learning</h3>
          <div className="flex flex-wrap gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-100 rounded-lg p-4 shadow-md w-64 h-auto flex flex-col items-center"
              >
                {/* Video Player */}
                <video controls className="w-full rounded">
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Video Title */}
                <p className="font-bold text-lg mt-2">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Top Courses Section */}
        <div className="p-6">
          <h3 className="text-2xl font-semibold mb-4">Top Courses</h3>
          <div className="flex gap-6">
          {videos.map((video) => (
              <div
                key={video.id}
                className="bg-gray-100 rounded-lg p-4 shadow-md w-64 h-auto flex flex-col items-center"
              >
                {/* Video Player */}
                <video controls className="w-full rounded">
                  <source src={video.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                {/* Video Title */}
                <p className="font-bold text-lg mt-2">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
        <section>
           <h1>Welcome Student {user_id}, you are logged in!</h1>
        </section>
      </div>
    );
  };
  
  export default Student;
