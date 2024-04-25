import React from "react";
const NavPhoto = ({ imageUrl }) => {
  return (
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full  ">
        <img alt="Profile" src={imageUrl || "src/assets/default.jpg"} />
      </div>
    </div>
  );
};

export default NavPhoto;
