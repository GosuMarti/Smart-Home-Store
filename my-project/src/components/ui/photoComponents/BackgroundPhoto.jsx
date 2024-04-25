import React from "react";
import Avatar from "../photoComponents/Avatar";
import { Link } from "react-router-dom";

const BackgroundPhoto = () => {
  return (
    <div>
      <div className="relative">
        <Link to="/">
          <button className="absolute top-0 right-0 m-4 text-md text-white bg-black hover:bg-violet-700 border-none font-bold rounded-full p-3">
            Home
          </button>
        </Link>
        <div>
          <img
            src="https://cdn.hero.page/wallpapers/abef7a18-2e69-46e2-86a6-c1ba351c3101-nature's-geometry-minimalist-mountain-art-wallpaper-2.png"
            alt="Background"
            className="w-full h-96 object-cover shadow-md shadow-gray-200"
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundPhoto;
