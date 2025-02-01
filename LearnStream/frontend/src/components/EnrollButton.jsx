import axios from '../api/axios.js';
import React, { useEffect, useState } from 'react';

const EnrollButton = ({ course_id }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [Enrolled, setEnrolled] = useState(false);
    const token = localStorage.getItem('accessToken')
  const checkEnrolled = async () => {
    try {
      const response = await axios.get(`/courses/${course_id}/enrolled`, {
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        withCredentials: true,
      });

      console.log(response.data.data);
      setEnrolled(response.data.data); // ✅ Store boolean value in state

    } catch (error) {
      console.log(error);
    }
  };

  const enrollStudent = async () => {
    try {
      if (!Enrolled) {
        const response = await axios.post(`/courses/${course_id}/enroll`, {}, {
          headers: { 
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        });

        if (response.data.data === true) {
        console.log(`enrollment succesfull`)
          setEnrolled(true);
          setIsDisabled(true);
        }
      } else {
        setIsDisabled(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token){
        checkEnrolled();
    }
  }, [token,Enrolled]); // ✅ Run only once when component mounts

  return (
    <div>
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={enrollStudent}
        disabled={isDisabled || Enrolled} // ✅ Disable button when already enrolled
      >
        {Enrolled ? "Already Enrolled" : "Enroll Now"}
      </button>
    </div>
  );
};

export default EnrollButton;
