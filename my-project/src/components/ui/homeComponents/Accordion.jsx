import React from "react";
import { useState } from "react";

const Accordion = ({ onAccordionChange, title, message }) => {
  const [selectedAccordion, setSelectedAccordion] = useState(null);

  const handleAccordionChange = (index) => {
    setSelectedAccordion(index);
    onAccordionChange(index);
  };

  return (
    <div>
      <div className="border-l-2 hover:border-violet-500 text-black">
        <div className="collapse collapse-arrow bg-white">
          <input
            type="radio"
            name="accordion-see-1"
            checked={selectedAccordion === 0}
            onChange={() => handleAccordionChange(0)}
          />
          <div className="collapse-title text-xl font-medium">Mission:</div>
          <div className="collapse-content">
            <p>
              Our mission is to seamlessly integrate IoT products into everyday
              life, enhancing convenience, efficiency, and connectivity for our
              users.
            </p>
          </div>
        </div>
      </div>
      <div className="border-l-2 hover:border-violet-500 text-black">
        <div className="collapse collapse-arrow bg-white">
          <input
            type="radio"
            name="accordion-see-2"
            checked={selectedAccordion === 1}
            onChange={() => handleAccordionChange(1)}
          />
          <div className="collapse-title text-xl font-medium">Future:</div>
          <div className="collapse-content">
            <p>
              IoT products revolutionize industries, homes, and daily
              experiences, ushering in unprecedented levels of efficiency and
              convenience.
            </p>
          </div>
        </div>
      </div>
      <div className="border-l-2 hover:border-violet-500 text-black">
        <div className="collapse collapse-arrow bg-white ">
          <input
            type="radio"
            name="accordion-see-3"
            checked={selectedAccordion === 2}
            onChange={() => handleAccordionChange(2)}
          />
          <div className="collapse-title text-xl font-medium">Our team:</div>
          <div className="collapse-content">
            <p>
              Our team is committed to provide user-friendly IoT products that
              make your life easier and more enjoyable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
