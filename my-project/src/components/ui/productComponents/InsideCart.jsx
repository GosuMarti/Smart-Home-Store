import React, { useState } from "react";
import { useCart } from "../../../CartContext";
import { PlusIcon, MinusIcon } from "@heroicons/react/outline";
import { RoundedTwoDecimals } from "../../RoundedTwoDecimals";

const InsideCart = ({ id, title, price, image, quantity }) => {
  const { updateQuantity, removeItem } = useCart();
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const handleQuantityChange = (newQuantity) => {
    setLocalQuantity(newQuantity);
    updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = () => {
    removeItem(id);
  };

  const calculateNewPrice = (price, quantity) => {
    return price * quantity;
  };

  return (
    <div className="gap-2 py-3 border-t-2 flex flex-col sm:flex-row items-center h-[200px] ">
      <div className="flex items-center mb-2 sm:mb-0">
        <div className="overflow-hidden">
          <img src={image} alt="Product" className="w-40 h-auto object-cover" />
        </div>
        <div className="ml-4">
          <p className="text-lg text-black font-bold">{title}</p>
          <p className="text-sm text-gray-500">
            Price: BGN{" "}
            {RoundedTwoDecimals(calculateNewPrice(price, localQuantity))}
          </p>
        </div>
      </div>

      <div className="ml-auto flex items-center">
        <button
          onClick={() => handleQuantityChange(localQuantity - 1)}
          disabled={localQuantity === 1}
          className="bg-violet-500 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <MinusIcon className="h-5 w-5" />
        </button>
        <span className="bg-gray-200 text-black py-1 px-3 mx-2 rounded-full">
          {localQuantity}
        </span>
        <button
          onClick={() => handleQuantityChange(localQuantity + 1)}
          className="bg-violet-500 text-white mr-1 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
        <button onClick={handleRemoveItem} className="ml-5 mr-2">
          <img
            src="delete.svg"
            alt="delete"
            className="h-6 w-6 bg-red-600 hover:text-red-700 rounded-full p-1"
          />
        </button>
      </div>
    </div>
  );
};

export default InsideCart;
