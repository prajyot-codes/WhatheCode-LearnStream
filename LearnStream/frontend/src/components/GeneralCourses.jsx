import React, { useEffect, useState } from "react";
import CategoryBar from "./CategoryBar";
import CourseComp from "./CourseComp";
import axios from "../api/axios";
const GeneralCourses = ({ viewCourse, errMsg, setErrMsg }) => {
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

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [courses, setCourses] = useState([]);

  const [enrolled, setEnrolled] = useState(`Enroll`);
  // const viewCourse = async (course_id)=>{

  // }
  const enrollStudent = async () => {
    try {
      if (localStorage.getItem("accessToken") != undefined) {
        const response = await axios.post(`/courses/${courses._id}/enroll`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          Authorization: `Bearer ${token}`,
        });
        if (response.statusText == `student succesfully enrolled`) {
          setEnrolled(`View Course`);
        }
      } else throw Error;
    } catch (error) {
      console.log(error);
    }
  };
  const ButtonNames = [`Enroll Student`, `View Course`, `Edit Course`];
  const buttonHandlers = { enrollStudent, viewCourse, editCourse };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `/courses?category=${selectedCategory}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          },
        );

        setCourses(response.data.data || []);
      } catch (err) {
        console.log(err.response);
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 401) {
          setErrMsg("Unauthorized");
        } else {
          setErrMsg("Courses Retrieval Failed");
        }
        errRef.current.focus();
      }
    };
    fetchCourses();
  }, [selectedCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div data-oid="ic543mh">
      <CategoryBar
        categories={categories}
        onCategorySelect={handleCategoryChange}
        data-oid="_bnfkzx"
      />
      <CourseComp
        courses={courses}
        ButtonName={buttonName}
        buttonHandlers={buttonHandlers}
        errMsg={errMsg}
        data-oid="o_ikid5"
      />
    </div>
  );
};

export default GeneralCourses;
