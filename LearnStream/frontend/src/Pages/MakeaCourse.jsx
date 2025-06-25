import React, { useState } from "react";
import { Button,Checkbox ,TextInput, Textarea, Label, Dropdown } from "flowbite-react";
import axios from "../api/axios"; // Ensure this path matches your file structure
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";


function MakeaCourse() {
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const {auth,setAuth} = useContext(AuthContext)
  const {user_id,accessToken} = auth;
  const [coursePrice, setCoursePrice] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [Live, setLive] = useState(true)
  const categories = [ "Web Development",
    "Arts and Humanities",
    "Business",
    "Computer Science",
    "Data Science",
    "Information Technology",
    "Health",
    "Math and Logic"];

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleCategorySelect = (category) => {
    setCourseCategory(category);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const courseData = new FormData();
      courseData.append("thumbnail", thumbnail); // Attach the file
      courseData.append("title", courseTitle); // Add title
      courseData.append("description", courseDescription); // Add description
      courseData.append("price", coursePrice); // Add price
      courseData.append("category", courseCategory); // Add category
      courseData.append("isLive", Live);

      // Axios POST request
      const response = await axios.post("/courses/", courseData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
          withCredentials: true,
          Authorization: `Bearer ${accessToken}`, 
        },
      });


      console.log("Course created successfully:", response.data);
      const courseId= response?.data?._id || response?.data?.data?._id;

      console.log(courseId);
      
      // console.log(response?.data?.data.)
      // Reset form fields
      setCourseTitle("");
      setCourseDescription("");
      setCoursePrice("");
      setCourseCategory("");
      setThumbnail(null);
      if(Live) {
        navigate
      }
      navigate(`/teacher/${user_id}/${courseId}`)
    } catch (e) {
      console.error("Error creating course:", e.response?.data || e.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="flex flex-col gap-6 max-w-4xl w-full p-8 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="course-title" value="Course Title" />
          </div>
          <TextInput
            id="course-title"
            type="text"
            placeholder="Enter course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="course-description" value="Course Description" />
          </div>
          <Textarea
            id="course-description"
            placeholder="Enter course description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="course-price" value="Course Price" />
          </div>
          <TextInput
            id="course-price"
            type="number"
            placeholder="Enter course price"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="course-category" value="Course Category" />
          </div>
          <Dropdown
            label={courseCategory || "Select a category"}
            color="light"
            size="lg"
          >
            {categories.map((category) => (
              <Dropdown.Item
                key={category}
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="thumbnail" value="Course Thumbnail" />
          </div>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full border rounded-lg p-2"
          />
        </div>
        <div className="flex items-center gap-2 ">
        <Checkbox id="accept" checked={Live} onChange={(e)=>setLive(e.target.checked)}  />
        <Label htmlFor="accept" className="flex text-xl">
          Make it Live  
        </Label>
      </div>
        <Button type="submit">Create Course</Button>
      </form>
    </div>
  );
}

export default MakeaCourse;
