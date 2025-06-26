import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";
import { displayRazorpay } from "./displayRazorpay";
import { useParams } from "react-router-dom";

function BuyCourseButton({ amount }) {
  const { auth } = useContext(AuthContext);
  const token = auth?.accessToken;

  const { course_id } = useParams(); // ✅ destructure from useParams
  return (
    <button
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={() => displayRazorpay({ course_id, amount, token })}
    >
      Buy Now
    </button>
  );
}

export default BuyCourseButton;
