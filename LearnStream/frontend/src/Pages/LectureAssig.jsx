import { useLocation } from "react-router-dom";
import LectureComponent from "../components/LectureComponent";

const LectureAssig = () => {
  const location = useLocation();
  const { lectures = [], course_id } = location.state || {};

  return (
    <div>
      <LectureComponent lectures={lectures} course_id={course_id} />
    </div>
  );
};

export default LectureAssig;
