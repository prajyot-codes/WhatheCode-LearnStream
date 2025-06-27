// src/utils/displayRazorpay.js
import axios from "../api/axios"; // Your Axios instance

async function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}
export const displayRazorpay = async ({ course_ids, amount, token, setCartItems }) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Razorpay SDK failed to load.");
    return;
  }

  const enrollStudent = async (course_ids) => {
    try {
      const response = await axios.post(
        `/courses/enroll`,
        { course_ids },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        console.log(`✅ Enrollment successful for:`, course_ids);
      }
    } catch (error) {
      console.error("❌ Enrollment error:", error);
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      const verifyRes = await axios.post(
        "/payment/verify",
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (verifyRes.data.success) {
        await enrollStudent(course_ids);
        if (typeof setCartItems === "function") {
          setCartItems([]); // ✅ now will work safely
        } else {
          console.error("❌ setCartItems is not a function:", setCartItems);
        }
      } else {
        alert("❌ Payment verification failed.");
      }
    } catch (err) {
      console.error("Verification Error:", err);
      alert("Payment verification failed.");
    }
  };

  const { data } = await axios.post(
    "/payment/create-order",
    { course_ids, amount },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  const order = data.data;

  const options = {
    key: "rzp_test_yLlU5Vi0wMY8hC",
    amount: order.amount,
    currency: order.currency,
    name: "LearnStream",
    description: "Course Purchase",
    order_id: order.id,
    handler: (response) => {
      // Wrap to preserve the context
      handlePaymentSuccess(response);
    },
    prefill: {
      email: "test@example.com",
      contact: "9999999999",
    },
    notes: {
      course_ids: course_ids.join(","),
    },
    theme: {
      color: "#3399cc",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
