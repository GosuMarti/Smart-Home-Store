import React from "react";

const Technologies = () => {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-9 gap-2">
      <img className="w-11 h-11 sm:w-32 sm:h-32" src="/js.svg" alt="js" />
      <img className="w-11 h-11 sm:w-32 sm:h-32" src="/html.svg" alt="html" />
      <img className="w-11 h-11 sm:w-32 sm:h-32" src="/css.svg" alt="css" />
      <img className="w-11 h-11 sm:w-32 sm:h-32" src="/sql.svg" alt="sql" />
      <img
        className="w-11 h-11 sm:w-32 sm:h-32"
        src="/spring.svg"
        alt="spring"
      />
      <img className="w-11 h-11 sm:w-32 sm:h-32" src="/react.svg" alt="react" />
      <img className="w-11 h-11 sm:w-32 sm:h-32" src="/java.svg" alt="java" />
      <img
        className="w-11 h-11 sm:w-32 sm:h-32"
        src="/tailwind.svg"
        alt="tailwind"
      />
      <img className="w-11 h-11 sm:w-32 sm:h-32" src="/daisy.svg" alt="daisy" />
    </div>
  );
};

export default Technologies;
