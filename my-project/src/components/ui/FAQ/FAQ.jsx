import React from "react";
import { useState } from "react";
import Buttom from "../Buttom";
import FAQAccordion from "./FAQAccordion";

const FAQ = () => {
  return (
    <>
      <div className="flex justify-center  bg-gray-100 my-5 mx-4 rounded-xl">
        <div className="py-8">
          <h3 className="flex font-bold text-violet-500 justify-center ">
            FAQs
          </h3>
          <h1 className="flex text-2xl sm:text-4xl  font-semibold text-black justify-center">
            Frequently asked questions
          </h1>
          <h2 className="text-md font-medium text-slate-500 flex justify-center pt-3 pb-16">
            Here are our most frequently asked questions.
          </h2>
          <div className="flex flex-col">
            <FAQAccordion
              title="What is your return policy?"
              message="We offer a hassle-free return policy within 30 days."
            />
            <FAQAccordion
              title="How do I place an order?"
              message="Browse, select items, add to cart, checkout."
            />
            <FAQAccordion
              title="Do you offer discounts or promotions?"
              message="Yes, we frequently offer discounts and special offers to our customers."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
