import React from "react";
import { useCart } from "../../../CartContext";
import { useNavigate } from "react-router-dom";

const Shop = ({ id, title, priceCurrent, priceOriginal, image, discount }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (event) => {
    event.preventDefault();
    const product = {
      id,
      title,
      price: priceCurrent,
      image,
      discount,
      quantity: 1,
    };
    addToCart(product);
  };

  return (
    <>
      <div className="relative w-full sm:max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl card shadow-xl">
        <figure className="h-64 overflow-hidden">
          <img
            src={image}
            alt="Product"
            className="w-auto h-full object-cover"
          />
        </figure>
        <div className="p-4">
          <h2 className="text-lg text-black">{title}</h2>
          <div className="flex items-center">
            <div className="text-xl text-gray-900 mr-2">
              BGN{" "}
              {discount > 0 && <s className="text-gray-500">{priceOriginal}</s>}{" "}
              {priceCurrent}
            </div>
            {discount > 0 && (
              <p className="text-red-700 font-bold text-lg">-{discount}%</p>
            )}
          </div>
          <div className="flex items-center justify-end">
            <button
              className="btn bg-black hover:bg-violet-500 text-white border-none"
              onClick={(event) => handleAddToCart(event)}
            >
              Add to Cart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
