import axios from "../api/axios"; // your configured axios instance

async function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export const displayRazorpay = async ({ course_id, amount, token }) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  const { data } = await axios.post(
    "/payment/create-order",
    { course_id, amount },
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
    key: "rzp_test_yLlU5Vi0wMY8hC", // ✅ your Razorpay key
    amount: order.amount,
    currency: order.currency,
    name: "LearnStream",
    description: "Course Purchase",
    image: "",
    order_id: order.id,
    handler: async function (response) {
      console.log("🧾 Razorpay response:", response);

      // ✅ Send to backend for signature verification
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
          alert(`✅ Payment successful & verified ${order.id}`);
        } else {
          alert("❌ Payment failed verification");
        }
      } catch (err) {
        console.error("❌ Error during verification:", err);
        alert("Verification request failed");
      }
    },
    prefill: {
      email: "test@example.com",
      contact: "9999999999",
    },
    notes: {
      course_id,
    },
    theme: {
      color: "#3399cc",
    },
    retry: {
      enabled: true,
      max_count: 3,
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};
