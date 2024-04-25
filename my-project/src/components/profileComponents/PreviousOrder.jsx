import { Link } from "react-router-dom";
import { useState } from "react";
import { RoundedTwoDecimals } from "../RoundedTwoDecimals";

const Order = ({ status, phone, address, time, price, details }) => {
  const [isItemsVisible, setIsItemsVisible] = useState(false);
  return (
    <div className="py-8 border-t border-gray-200">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Order Details
          </h3>
          <div className="mb-4">
            <p className="text-md font-medium text-gray-600">
              Status: <span className="text-indigo-600">{status}</span>
            </p>
            <p className="text-md font-medium text-gray-600">Phone: {phone}</p>
            <p className="text-md font-medium text-gray-600">
              Address: {address}
            </p>
            <p className="text-md font-medium text-gray-600">Date: {time}</p>
            <p className="text-md font-medium text-gray-600">
              Total Price: BGN {RoundedTwoDecimals(price)}
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsItemsVisible(!isItemsVisible)}
              className="text-md font-bold  text-black  underline  mb-2 focus:outline-none"
            >
              {isItemsVisible ? "Hide Items" : "Show Items"}
            </button>
            {isItemsVisible && (
              <div>
                {details.map((item, index) => (
                  <div key={index} className="mb-3 p-4 bg-gray-50 rounded-lg">
                    <p className="text-md font-semibold text-gray-800">
                      Product: {item.productName}
                    </p>
                    <p className="text-md text-gray-600">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-md text-gray-600">
                      Price: {RoundedTwoDecimals(item.purchasePrice)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-end">
            <Link to="/product">
              <button className="bg-violet-600 text-white px-4 py-2  hover:bg-violet-700 transition-colors duration-200 rounded-md">
                Shop More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
