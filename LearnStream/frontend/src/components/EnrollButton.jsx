
import { useContext } from 'react';
import axios from '../api/axios.js';
import  { useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthProvider.jsx';

const EnrollButton = ({ course_id ,setEnroll }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [Enrolled, setEnrolled] = useState(false);
  const {auth,setAuth} = useContext(AuthContext)
  const token = auth?.accessToken
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
      setEnrolled(response.data.data);
      setEnroll(response.data.data); // ✅ Store boolean value in state

    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    
        checkEnrolled();
    // console.log("prajyot");
    
  }, [token,course_id]); // ✅ Run only once when component mounts
  
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
