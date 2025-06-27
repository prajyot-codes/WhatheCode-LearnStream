import axios from '../api/axios.js';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthProvider.jsx';

function AddToCartBtn({ course_id,enrolled }) {
  const [inCart, setInCart] = useState(false);
  const {auth,setAuth} = useContext(AuthContext)
  const token = auth?.accessToken
  const navigate = useNavigate();

  const checkPresence = async () => {
    try {
        // console.log(token);
      const response = await axios.get(`/courses/cart/${course_id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });
      const temp=response.data?.data?.inCart
      console.log(response.data);
      
      console.log(`${temp}`);
      setInCart(temp);
    //   console.log(`kjsef;sj${inCart}`)
    } catch (err) {
      console.error("Error checking cart presence:", err);
    }
  };

  useEffect(() => {
    
      checkPresence();
    
  }, [course_id, token]);

  const handleClick = async () => {
  if (inCart && !enrolled) {
    navigate('/cart')
    
  } else {
    try {
      const response = await axios.post(
        `/courses/cart/${course_id}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setInCart(true);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }
};


  return (
    <button
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
      onClick={handleClick}
      disabled = {enrolled}
    >
      {inCart ? 'Go to Cart' : 'Add to Cart'}
    </button>
  );
}

export default AddToCartBtn;
