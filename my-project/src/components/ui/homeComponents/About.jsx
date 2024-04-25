import React from "react";
import Accordion from "../homeComponents/Accordion";
import { useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [selectedAccordionIndex, setSelectedAccordionIndex] = useState(0);

  const handleAccordionChange = (index) => {
    setSelectedAccordionIndex(index);
  };

  const renderImage = () => {
    switch (selectedAccordionIndex) {
      case 0:
        return (
          <img
            src="mission.svg"
            alt="mission"
            className="w-42 sm:w-96 rounded-lg"
          />
        );
      case 1:
        return (
          <img
            src="future.svg"
            alt="future"
            className="w-42 sm:w-96 rounded-lg"
          />
        );
      case 2:
        return (
          <img
            src="people.svg"
            alt="members"
            className="w-42 sm:w-96 rounded-lg "
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="hero min-h-screen bg-white">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {renderImage()}
        <div>
          <h1 className="text-5xl font-bold mb-5 text-violet-500">About us:</h1>
          <Accordion onAccordionChange={handleAccordionChange} />
          <Link to="/about">
            <button className="btn bg-violet-500 hover:bg-violet-700 text-white mt-1 border-none">
              Learn more
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
