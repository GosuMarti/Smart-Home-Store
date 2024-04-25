import React, { useState, useRef, useEffect } from "react";

const Avatar = ({ photoURL }) => {
  return (
    <div className="avatar">
      <div className="w-48 h-48 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={photoURL}
          alt="User avatar"
        />
      </div>
    </div>
  );
};

export default Avatar;
