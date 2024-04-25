import NavBar from "../navigation/NavBar";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RoundedTwoDecimals } from "../../RoundedTwoDecimals";
import { useAuth } from "../../../auth/AuthContext ";
import { useCart } from "../../../CartContext";

const ShopInside = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { userInfo } = useAuth();
  const token = localStorage.getItem("jwtToken");
  const [selectedDiscount, setSelectedDiscount] = useState("");
  const { addToCart } = useCart();

  const handleAddToCart = (event) => {
    event.preventDefault();

    const productToAdd = {
      id: product.id,
      title: product.name,
      price: RoundedTwoDecimals(product.currentPrice),
      image: product.photo,
      discount: product.discount,
      quantity: 1,
    };

    addToCart(productToAdd);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    };
    fetchProduct();
  }, [id]);

  const fetchPromo = async (event) => {
    const newDiscount = parseInt(event.target.value, 10);
    setSelectedDiscount("");
    if (!token) {
      console.error("No JWT token found.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8080/set-discount/${id}`,
        JSON.stringify(newDiscount),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Promo added successfully!", response.data);
      window.location.reload();
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error", error.message);
      }
    }
  };

  const deleteProduct = async () => {
    if (!token) {
      console.error("No JWT token found.");
      return;
    }
    console.log(userInfo?.userType);
    if (userInfo?.userType === "ADMIN") {
      try {
        await axios.delete(
          `http://localhost:8080/productDelete/${id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Product deleted successfully!");
        navigate("/product-employee");
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
          console.log(token);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="overflow-hidden h-16">
        <NavBar />
      </div>
      <div className="flex flex-col md:flex-row items-center  mx-4 md:mx-8">
        <div className="w-full md:w-2/6 flex flex-col items-center justify-center border-r-0 md:border-r-2 border-gray-300 mb-8 md:mb-0">
          <img src={product.photo} alt="photo" />
          <div className="flex flex-wrap w-full justify-center"></div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center pt-4 md:pt-0 px-4 md:px-12">
          <div className="flex items-center justify-end mb-4">
            {userInfo?.userType === "ADMIN" && (
              <button
                className="rounded-full bg-red-500 text-white p-2 mr-2"
                onClick={deleteProduct}
              >
                <img width={20} height={20} src="/delete.svg" alt="delete" />
              </button>
            )}
            {(userInfo?.userType === "ADMIN" ||
              userInfo?.userType === "EMPLOYEE") && (
              <Link key={product.id} to={`/edit-product/${product.id}`}>
                <button className="rounded-full bg-violet-500 text-white p-2 mr-2">
                  <img width={20} height={20} src="/edit.svg" alt="edit" />
                </button>
              </Link>
            )}
          </div>

          {product && (
            <>
              <h2 className="text-xl text-gray-900 mb-2">{product.category}</h2>
              <h2 className="text-3xl text-black mb-2">{product.name}</h2>
              <h2 className="text-xl text-gray-900 mb-1">
                Model: {product.model}
              </h2>
              <h2 className="text-xl text-gray-900 mb-4">
                Brand: {product.brand}
              </h2>

              <p className="mb-4 text-slate-900 text-xl">
                {product.description}
              </p>

              {product.discount > 0 && (
                <p className="text-red-700 font-bold text-lg">
                  -{product.discount}%
                </p>
              )}

              <p className="text-2xl mb-2 text-black">
                <span className="text-xl">
                  BGN{" "}
                  {product.discount > 0 && (
                    <s className="text-gray-500">
                      {product.originalPrice
                        ? RoundedTwoDecimals(product.originalPrice)
                        : product.originalPrice}
                    </s>
                  )}{" "}
                  {product.currentPrice
                    ? RoundedTwoDecimals(product.currentPrice)
                    : product.currentPrice}
                </span>
              </p>
              {(userInfo?.userType === "ADMIN" ||
                userInfo?.userType === "EMPLOYEE") && (
                <div className="flex flex-row items-center gap-2">
                  <h4 className="text-black">Discount: </h4>

                  <select
                    className="bg-white text-sm"
                    value={selectedDiscount}
                    onChange={fetchPromo}
                  >
                    <option value="" disabled>
                      Изберете отстъпка
                    </option>
                    <option value={0}>0%</option>
                    <option value={5}>-5%</option>
                    <option value={10}>-10%</option>
                    <option value={15}>-15%</option>
                    <option value={20}>-20%</option>
                    <option value={25}>-25%</option>
                    <option value={30}>-30%</option>
                    <option value={50}>-50%</option>
                    <option value={75}>-75%</option>
                  </select>
                </div>
              )}

              <div className="flex justify-center mb-2">
                {userInfo?.userType === "CUSTOMER" && (
                  <button
                    className="mt-4 w-1/2 bg-violet-500 hover:bg-violet-400 text-white font-bold p-3 rounded-full"
                    onClick={(event) => handleAddToCart(event)}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopInside;
