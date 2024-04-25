import React from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext ";
const DisplayDeletedProducts = ({
  id,
  title,
  priceCurrent,
  priceOriginal,
  image,
  discount,
  onReturnToSale,
}) => {
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
          <h2 className="text-lg text-black">{id}</h2>
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
          <div className="flex items-center justify-end"></div>
        </div>
      </div>
    </>
  );
};

export default DisplayDeletedProducts;
