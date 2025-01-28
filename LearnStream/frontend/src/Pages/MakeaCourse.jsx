import React, { useState } from "react";
import { Button, TextInput, Textarea, Label, Dropdown } from "flowbite-react";
import axios from "../api/axios"; // Ensure this path matches your file structure
import { useNavigate } from "react-router-dom";

function MakeaCourse() {
  const navigate = useNavigate();
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const categories = [
    "Web Development",
    "Arts and Humanities",
    "Business",
    "Computer Science",
    "Data Science",
    "Information Technology",
    "Health",
    "Math and Logic",
  ];

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
    }
  };

  const handleCategorySelect = (category) => {
    setCourseCategory(category);
  };

  const token = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const courseData = new FormData();
      courseData.append("thumbnail", thumbnail); // Attach the file
      courseData.append("title", courseTitle); // Add title
      courseData.append("description", courseDescription); // Add description
      courseData.append("price", coursePrice); // Add price
      courseData.append("category", courseCategory); // Add category

      // Axios POST request
      const response = await axios.post("/courses/", courseData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file uploads
          withCredentials: true,
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Course created successfully:", response.data);
      const courseId = response?.data?._id || response?.data?.data?._id;

      console.log(courseId);
      const userId = localStorage.getItem("user_id");
      // console.log(response?.data?.data.)
      // Reset form fields
      setCourseTitle("");
      setCourseDescription("");
      setCoursePrice("");
      setCourseCategory("");
      setThumbnail(null);
      navigate(`/teacher/${userId}/${courseId}`);
    } catch (e) {
      console.error("Error creating course:", e.response?.data || e.message);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      data-oid="5zli6rd"
    >
      <form
        className="flex flex-col gap-6 max-w-4xl w-full p-8 bg-white shadow-lg rounded-lg"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        data-oid="j81l4.v"
      >
        <div data-oid="atbwprj">
          <div className="mb-2 block" data-oid="_f9_opn">
            <Label
              htmlFor="course-title"
              value="Course Title"
              data-oid="y-2fll8"
            />
          </div>
          <TextInput
            id="course-title"
            type="text"
            placeholder="Enter course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            required
            shadow
            data-oid="8.9shp8"
          />
        </div>
        <div data-oid=".:h8f_0">
          <div className="mb-2 block" data-oid="fpc49ch">
            <Label
              htmlFor="course-description"
              value="Course Description"
              data-oid="0k2c6e9"
            />
          </div>
          <Textarea
            id="course-description"
            placeholder="Enter course description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
            shadow
            data-oid="1l_1saa"
          />
        </div>
        <div data-oid="q-h7u99">
          <div className="mb-2 block" data-oid="wiff6ec">
            <Label
              htmlFor="course-price"
              value="Course Price"
              data-oid="uwz20:b"
            />
          </div>
          <TextInput
            id="course-price"
            type="number"
            placeholder="Enter course price"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            required
            shadow
            data-oid="sdl16qw"
          />
        </div>
        <div data-oid="a6s773h">
          <div className="mb-2 block" data-oid="4n673v2">
            <Label
              htmlFor="course-category"
              value="Course Category"
              data-oid="ny4kk.s"
            />
          </div>
          <Dropdown
            label={courseCategory || "Select a category"}
            color="light"
            size="lg"
            data-oid="43v-49_"
          >
            {categories.map((category) => (
              <Dropdown.Item
                key={category}
                onClick={() => handleCategorySelect(category)}
                data-oid="7qtoobr"
              >
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
        <div data-oid="v.3npjw">
          <div className="mb-2 block" data-oid=".3j68qy">
            <Label
              htmlFor="thumbnail"
              value="Course Thumbnail"
              data-oid="vu3l4hs"
            />
          </div>
          <input
            id="thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
            className="w-full border rounded-lg p-2"
            data-oid="5m0yhb4"
          />
        </div>
        <Button type="submit" data-oid=":lr_:93">
          Create Course
        </Button>
      </form>
    </div>
  );
}

export default MakeaCourse;
