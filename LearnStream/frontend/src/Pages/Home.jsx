import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import CategoryBar from "../components/CategoryBar";
import GeneralCourses from "../components/GeneralCourses";

const Home = () => {
  const [courseCategories, setCourseCategories] = useState();
  const courseDiv = useRef(null);

  const loadCourses = async (e) => {
    try {
      const response = await axios.get("/courses/", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // console.log(response);
      console.log(
        response.data?.data?.map((course) => {
          return course?.category;
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadCourses();
  }, []);
  return (
    <>
      <section
        className="relative bg-[url('/assets/HeroImg.png')] bg-cover bg-center bg-no-repeat"
        style={{ height: "90vh", width: "100%" }}
        data-oid="3gp989n"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/75 to-transparent/0"
          data-oid="4x_p3z-"
        ></div>

        <div
          className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
          data-oid="v96wjdt"
        >
          <div
            className="max-w-xl text-center ltr:sm:text-left"
            data-oid="0pe-s9w"
          >
            <h1
              className="text-3xl font-extrabold sm:text-17xl"
              data-oid="f-ungph"
            >
              Transform Your Education Journey.
            </h1>
            <p className="mt-4 max-w-lg sm:text-xl/relaxed " data-oid="sks4otc">
              Take the first step toward mastering new skills and broadening
              your horizons.
            </p>
            <div
              className="mt-8 flex flex-wrap gap-4 text-center justify-center"
              data-oid="wfy36n_"
            >
              <Link
                to={"/login"}
                className="block w-full rounded bg-[#588157] px-12 py-3 text-sm font-medium text-white shadow hover:bg-[#137dc7] focus:outline-none focus:ring sm:w-auto hover:text-black"
                data-oid="zvnccuf"
              >
                Get Started
              </Link>
              <a
                href="#"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-black shadow hover:text-black focus:outline-none focus:ring sm:w-auto"
                data-oid=":owjdcl"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      <div
        ref={courseDiv}
        className="   font-sans font-bold ml-4 mt"
        data-oid="ckkv:m6"
      >
        Courses
        <div data-oid="amk72xr">
          <GeneralCourses data-oid="2-uwe:_" />
        </div>
      </div>
    </>
  );
};

export default Home;
