import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GeneralCourses from "../components/GeneralCourses";
import LearningGoals from "../components/udemycomponent";
import Testimonials from "../components/testimonials";

const Home = () => {
  const courseDiv = useRef(null);
  const [course_id, setCourse_id] = useState("");
  const view = `View Course`;
  const navigate = useNavigate();
  const viewCourse = (course_id) => {
    navigate(`/user/${course_id}`);
  };
  const user_id=localStorage.getItem('user_id')
  return (
    <>
      <section
        className="relative bg-[url('/assets/HeroImg.png')] bg-cover bg-center bg-no-repeat"
        style={{ height: "90vh", width: "100%" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent/0"></div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left">
            <h1 className="text-3xl font-extrabold sm:text-17xl">
              Transform Your Education Journey.
            </h1>
            <p className="mt-4 max-w-lg sm:text-xl/relaxed ">
              Take the first step toward mastering new skills and broadening
              your horizons.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 text-center justify-center">
              <Link
                to={user_id ? "#" : "/login"}
                className="block w-full rounded bg-[#588157] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#137dc7] focus:outline-none focus:ring sm:w-auto hover:text-black"
              >
                Get Started
              </Link>

              <a
                href="#"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:text-black focus:outline-none focus:ring sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <div ref={courseDiv} className="font-sans font-bold ml-4 mt">
        Courses
        <div>
          <GeneralCourses
            setCourse_id={setCourse_id}
            ButtonName={view}
            buttonHandler={viewCourse}
          />{" "}
          {/* Fetches courses itself */}
        </div>
        <LearningGoals/>
          <br />
          <Testimonials/>
      </div>
    </>
  );
};

export default Home;
