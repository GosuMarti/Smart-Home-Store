import React, { useEffect, useState } from "react";
import { useCart } from "../../../CartContext";
import InsideCart from "./InsideCart";
import NavBar from "../navigation/NavBar";
import { RoundedTwoDecimals } from "../../RoundedTwoDecimals";
import axios from "axios";
import { useAuth } from "../../../auth/AuthContext ";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, clearCart } = useCart();
  const [actualIds, setActualIds] = useState([]);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { userInfo } = useAuth();
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActualIds = async () => {
      try {
        const ids = [];
        for (const product of cartItems) {
          const response = await axios.get(
            `http://localhost:8080/products?name=${encodeURIComponent(
              product.title
            )}`
          );
          const foundProduct = response.data.find(
            (p) => p.name === product.title
          );
          if (foundProduct) {
            ids.push(foundProduct.id);
          }
        }
        setActualIds(ids);
      } catch (error) {
        console.error("Error fetching actual IDs:", error);
      }
    };

    fetchActualIds();
  }, [cartItems]);

  const handleCheckout = async () => {
    console.log(userInfo?.userType);
    if (userInfo?.userType === "CUSTOMER") {
      try {
        const order = {
          clientId: userInfo?.id,
          address: address,
          phoneNumber: phoneNumber,
          productIdQuantityMap: {},
        };

        cartItems.forEach((item, index) => {
          order.productIdQuantityMap[actualIds[index]] = item.quantity;
        });

        const response = await axios.post(
          "http://localhost:8080/createOrder",
          order,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Order created successfully:", response.data);
        clearCart();
        navigate("/");
      } catch (error) {
        console.error("Error creating order:", error);
      }
    }
  };

  return (
    <>
      <div className="bg-white min-h-screen flex flex-col">
        <NavBar />
        <div className="flex flex-col">
          <h1 className="flex justify-center mt-20 text-4xl text-violet-500">
            Cart
          </h1>

          <div className="flex flex-col sm:flex-row justify-center mt-4 gap-3">
            <div className="flex flex-col gap-20 sm:gap-10  h-[575px] overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-center text-lg text-gray-500">
                  Your cart looks a little lonely!
                </p>
              ) : (
                cartItems.map((product, index) => (
                  <InsideCart
                    key={index}
                    id={product.id}
                    title={product.title}
                    image={product.image}
                    price={product.price}
                    quantity={product.quantity}
                  />
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="bg-gray-200 p-4 w-full sm:w-72 rounded-r-lg shadow-xl flex flex-col justify-between">
                <div className="">
                  <h1 className="text-black text-2xl font-bold mb-4">
                    Summary
                  </h1>
                  {userInfo?.userType === "CUSTOMER" && (
                    <>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Address"
                        className="input input-bordered mb-2 bg-gray-300 text-black"
                      />
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Phone Number"
                        className="input input-bordered mb-4 bg-gray-300 text-black"
                      />
                    </>
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between mb-2">
                    <p className="text-lg text-black">Total:</p>
                    <p className="text-lg text-black">
                      BGN {RoundedTwoDecimals(calculateSubtotal(cartItems))}
                    </p>
                  </div>
                  {userInfo?.userType === "CUSTOMER" && (
                    <button
                      onClick={handleCheckout}
                      className="bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 font-medium"
                    >
                      Checkout
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const calculateSubtotal = (cartItems) => {
  return cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
};

export default CartPage;
