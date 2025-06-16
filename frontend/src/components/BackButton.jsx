// BackButton.jsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // optional icon if you're using lucide

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-blue-600 hover:underline mb-4"
    >
      <ArrowLeft /> Back
    </button>
  );
};

export default BackButton;
