import React, { useEffect, useState } from 'react'
import CategoryBar from './CategoryBar'
import CourseComp from './CourseComp'
import axios from '../api/axios';
const GeneralCourses = ({setCourse_id,ButtonName,buttonHandler,errMsg,setErrMsg}) => {
    const categories = [
        "Web Development",
        "Arts and Humanities",
        "Business",
        "Computer Science",
        "Data Science",
        "Information Technology",
        "Health",
        "Math and Logic"
      ];
    const [selectedCategory,setSelectedCategory] = useState(categories[0])
    const [courses,setCourses] = useState([])
     useEffect(()=>{ 
            const fetchCourses = async ()=>{
              try {
                        const response =await axios.get(`/courses?category=${selectedCategory}`,{
                            headers: { 'Content-Type': 'application/json' },
                            withCredentials: true 
                        })
                    
              setCourses(response.data.data|| []);   
            
              
              } catch (err) {
                console.log(err.response)
                    if (!err?.response) {
                        setErrMsg('No Server Response');
                    }
                    else if (err.response?.status === 401) {
                        setErrMsg('Unauthorized');
                    } else {
                        setErrMsg('Courses Retrieval Failed');
                    }
                    errRef.current.focus();
              }
          }
          fetchCourses();
        },[selectedCategory])  
    
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
     
     <CategoryBar categories={categories} onCategorySelect={handleCategoryChange} />
      <br />
      <CourseComp courses={courses} setCourse_id={setCourse_id} ButtonName={ButtonName} buttonHandler={buttonHandler}  errMsg={errMsg} />
    </div>
  );
};

export default GeneralCourses;
 