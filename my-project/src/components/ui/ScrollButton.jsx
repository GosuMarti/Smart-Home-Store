import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const ScrollButton = () => {
  const [showToast, setShowToast] = useState(false);

  const scrollBeginning = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setShowToast(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      {showToast && (
        <div className="toast">
          <button
            className="btn btn-circle border-none text-white bg-violet-500 hover:bg-violet-700"
            onClick={scrollBeginning}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default ScrollButton;
