import React from "react";

const testimonials = [
  {
    id: 1,
    text: "Because of this course I was able to clear my two interviews... Thanks for making such wonderful content.",
    name: "Diksha S",
    course: "Business Intelligence (BI)",
    image: "https://cms-images.udemycdn.com/96883mtakkm8/2Zf3uwp0rSHafQ2FnqIo8N/0c1963cd5ecc95ba774e0c7587e9aa9b/avatarDS.png",
    link: "https://www.udemy.com/course/oracle-fusion-technical-bi-publisher-reports/",
  },
  {
    id: 2,
    text: "This has helped me so much in my career...I joined as a frontend engineer and eventually transitioned to full stack engineer with the help of this course.",
    name: "Chethan B",
    course: "View this Go (golang) course.",
    image: "https://cms-images.udemycdn.com/96883mtakkm8/16wGsK1JuLiskSfV5DxLrt/301307d2676c70dd592fc61e9449fc0e/avatarCB.png",
    link: "https://www.udemy.com/course/go-the-complete-guide/",
  },
  {
    id: 3,
    text: "Today, I am a software developer, and I credit a significant part of my success to the solid foundation laid by this course.",
    name: "Batchu K",
    course: "View this Java course",
    image: "https://cms-images.udemycdn.com/96883mtakkm8/2bxMcjjWVPCRkvDRTETM7z/1927e490984b0f2abadea7496131e10b/avatarBK.png",
    link: "https://www.udemy.com/course/java-in-depth-become-a-complete-java-engineer/",
  },
  {
    id: 4,
    text: "I would highly recommend this Web Development Bootcamp to anyone interested in pursuing a career in web development or looking to enhance their skills in this field.",
    name: "Ankit K",
    course: "View this Web Development course",
    image: "https://cms-images.udemycdn.com/96883mtakkm8/27ybC0l0TYWPikaRhviWPx/86078d31b7fc624f2949c575b168cac4/avatarAK.png",
    link: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
  },
];

const Testimonials = () => {
  return (
    <section className="p-8 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-6">
        See what others are achieving through learning
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
            <p className="text-gray-700 italic">"{testimonial.text}"</p>
            <div className="flex items-center mt-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="ml-3">
                <p className="font-bold text-gray-900">{testimonial.name}</p>
                <a
                  href={testimonial.link}
                  className="text-blue-600 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {testimonial.course}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
