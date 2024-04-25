import React, { useState } from "react";

const Buttom = ({ textMessage }) => {
  return (
    <button className="btn border-none bg-black text-white hover:bg-violet-500 mt-5">
      {textMessage}
    </button>
  );
};

export default Buttom;
