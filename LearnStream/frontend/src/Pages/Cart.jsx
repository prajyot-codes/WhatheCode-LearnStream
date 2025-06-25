import axios from '../api/axios';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('studentAccessToken');
  const navigate=useNavigate();
  const getCart = async () => {
    try {
      const response = await axios.get(`/courses/cart`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });

      const items = response.data?.data?.items || [];
      const courses = items.map(item => item.course);
      setCartItems(courses);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeFromCart = async (courseId) => {
    try {
      await axios.delete(`/courses/cart/${courseId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        withCredentials: true,
      });

      // Refresh cart after removal
      setCartItems(prev => prev.filter(item => item._id !== courseId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  useEffect(() => {
     getCart();
  }, [token]);

  const total = cartItems.length === 0 ? 0 : cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      <h1 className="text-3xl font-bold my-6 text-center">🛒 Your Cart</h1>
      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-12">

        {/* Left Section - Cart Items */}
        <div className="flex-1 bg-white rounded-xl shadow p-4 space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 items-center border-b pb-4 cursor-pointer" onClick={()=> navigate(`/user/${item._id}`)} >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-600">Category: {item.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-semibold text-lg">₹{item.price}</p>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 mt-2 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Total at the bottom of cart items */}
          {cartItems.length > 0 && (
            <div className="flex justify-between items-center pt-4 mt-4 border-t text-lg font-semibold">
              <span>Total Amount:</span>
              <span className="text-green-600">₹{total}</span>
            </div>
          )}
        </div>

        {/* Right Section - Cart Summary */}
        <div className="w-full md:w-1/3 bg-gray-100 rounded-xl shadow p-4 space-y-4">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="flex justify-between">
            <span>Items:</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Total:</span>
            <span className="text-green-700">₹{total}</span>
          </div>
          <button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
        </div>

      </div>
    </>
  );
};

export default Cart;
