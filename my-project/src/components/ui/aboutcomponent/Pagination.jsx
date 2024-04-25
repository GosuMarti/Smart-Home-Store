import React from "react";
import { useState } from "react";

const Pagination = ({ diff }) => {
  const [selectButton, setSelectButton] = useState(0);

  const handleButton = (index) => {
    setSelectButton(index);
    diff(index);
  };

  return (
    <div className="join">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <button
          key={index}
          className={`join-item h-2 w-10 bg-gray-400 hover:bg-violet-500 rounded-full focus:bg-violet-500 active:bg-violet-500 ${
            selectButton === index ? "bg-violet-500" : ""
          }`}
          type="button"
          onClick={() => handleButton(index)}
        />
      ))}
    </div>
  );
};
export default Pagination;
