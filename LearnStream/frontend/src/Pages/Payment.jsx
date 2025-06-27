import { useContext } from "react";
import AuthContext from "../contexts/AuthProvider";
import { displayRazorpay } from "./displayRazorpay";
import { useParams } from "react-router-dom";

function BuyCourseButton({ amount,enrolled }) {
  const { auth } = useContext(AuthContext);
  const token = auth?.accessToken;
  const { course_id } = useParams();
  const course_ids = [course_id]; // 👈 Convert to array

  return (
    <button
      className="bg-green-600 text-white px-4 py-2 rounded"
      onClick={() => {displayRazorpay({ course_ids, amount, token })}}
      disabled = {enrolled }
    >
     { enrolled ?`Already Enrolled`:`Buy Now`}
    </button>
  );
}

export default BuyCourseButton;
