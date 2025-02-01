import React, { useState } from "react";

const features = [
  {
    id: 1,
    title: "Hands-on training",
    description:
      "Upskill effectively with AI-powered coding exercises, practice tests, and quizzes.",
    image: "https://cms-images.udemycdn.com/96883mtakkm8/4kbyXne3Slx9Sfz4nTBqdf/8ac2b75db1a118f15e2fb5dfe2bb4567/desktop-hands-on-learning-2x.png",
    icon: "🖐",
  },
  {
    id: 2,
    title: "Certification prep",
    description:
      "Prep for industry-recognized certifications by solving real-world challenges and earn badges along the way.",
    image: "https://cms-images.udemycdn.com/96883mtakkm8/GUVYFTj0uwEQuJha5j7TZ/133c991fb3b3f1f93a3e842f4baa7f44/desktop-certification-prep-2x.png",
    icon: "📜",
    link: "https://www.udemy.com/browse/certification/",
  },
  {
    id: 3,
    title: "Insights and analytics",
    description:
      "Fast-track goals with advanced insights plus a dedicated customer success team to help drive effective learning.",
    image: "https://cms-images.udemycdn.com/96883mtakkm8/6q4N9BvIQusFoheoALJhGj/678c1a0bb6c2a22d95461d409492231e/desktop-insights-and-analytics-2x.png",
    icon: "📊",
    badge: "Enterprise Plan",
    link: "https://business.udemy.com/analytics/",
  },
  {
    id: 4,
    title: "Customizable content",
    description:
      "Create tailored learning paths for team and organization goals and even host your own content and resources.",
    image: "https://cms-images.udemycdn.com/96883mtakkm8/385IhnON960Wvz50ooWIN3/d4e6738c97769258d387b3d609edaad4/desktop-customizable-2x.png",
    icon: "🔧",
    badge: "Enterprise Plan",
    link: "https://business.udemy.com/user-management/",
  },
];

const LearningGoals = () => {
  const [selectedFeature, setSelectedFeature] = useState(features[0]);

  return (
    <div className="m-8 flex flex-col md:flex-row gap-6 p-6 max-w-6xl mx-auto">
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold">Learning focused on your goals</h2>
        {features.map((feature) => (
          <div
            key={feature.id}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedFeature.id === feature.id ? "bg-purple-100" : "bg-white"
            }`}
            onClick={() => setSelectedFeature(feature)}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{feature.icon}</span>
              <div>
                <p className="font-semibold">{feature.title}</p>
                <p className="text-gray-600 text-sm">{feature.description}</p>
                {feature.link && (
                  <a
                    href={feature.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 text-sm font-semibold"
                  >
                    Learn more →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="md:w-1/2 flex justify-center items-center">
        <img
          src="../../public/assets/desktop-hands-on-learning-2x.webp"
          alt={selectedFeature.title}
          className="rounded-lg shadow-lg w-full"
        />
      </div>
    </div>
  );
};

export default LearningGoals;
