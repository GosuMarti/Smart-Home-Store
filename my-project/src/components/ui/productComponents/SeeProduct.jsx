import React from "react";
import { Link } from "react-router-dom";
import FadeAwayText from "../animation/FadeAwayText";

const SeeProduct = () => {
  return (
    <div className="mt-5 ">
      <div
        className="hero h-60"
        style={{
          backgroundImage:
            "url(https://blog.mktgessentials.com/hubfs/online-store-small-business-blog.png)",
        }}
      >
        <div className="hero-overlay bg-opacity-50 my-5"></div>
        <div className="hero-content text-center text-neutral-content ">
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl font-bold text-white">
              Interested in exploring our products?
            </h1>
            <Link to="/product">
              <button className="btn  btn-primary text-white bg-violet-500 hover:bg-violet-700 border-none">
                Click here
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeeProduct;
