import React from "react";

const FAQAccordion = ({ title, message }) => {
  return (
    <>
      <div className="collapse collapse-arrow bg-grey-100 text-black">
        <input type="radio" name="my-accordion-faq-1" defaultChecked />
        <div className="collapse-title text-xl font-medium">{title}</div>
        <div className="collapse-content">
          <p>{message}</p>
        </div>
      </div>
    </>
  );
};

export default FAQAccordion;
