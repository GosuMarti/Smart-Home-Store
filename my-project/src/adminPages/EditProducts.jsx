import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Forms from "./Forms";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../auth/AuthContext ";

const EditProducts = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const token = localStorage.getItem("jwtToken");
  const { id } = useParams();
  const [product, setProduct] = useState({
    photo: "",
    name: "",
    brand: "",
    model: "",
    category: "",
    quantity: 0,
    description: "",
    minPrice: 0,
    originalPrice: 0,
    discount: 0,
  });

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/product/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    if (
      token &&
      (userInfo?.userType === "ADMIN" || userInfo?.userType === "EMPLOYEE")
    ) {
      fetchProductDetails();
    }
  }, [id]);

  const edit = async (e) => {
    e.preventDefault();
    if (!token) {
      console.error("No JWT token found.");
      return;
    }
    if (userInfo?.userType === "ADMIN" || userInfo?.userType === "EMPLOYEE") {
      try {
        const response = await axios.put(
          `http://localhost:8080/products/${id}`,
          product,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log("Product edited successfully!");
          navigate(`/product/${id}`);
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setProduct({ ...product, [name]: files[0] });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-300 to-violet-200">
      <Link to="/" className="absolute top-0 right-0 m-4">
        <button className="text-md text-black bg-white hover:bg-violet-300 border-none font-bold rounded-full p-3">
          Home
        </button>
      </Link>

      <div className="flex items-center justify-center  min-h-screen">
        <div className="bg-white mt-20 sm:mt-5 px-14 sm:px-10 py-5 rounded-xl my-5">
          <Form onSubmit={edit}>
            <div className="mb-1 flex flex-col">
              <Forms
                label={"Photo:"}
                type={"text"}
                name={"photo"}
                value={product.photo}
                onChange={handleChange}
              />
            </div>
            <div className="mb-1 flex flex-col">
              <Forms
                label={"Name:"}
                type={"text"}
                name={"name"}
                value={product.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-1 flex flex-col">
              <Forms
                label={"Brand:"}
                type={"text"}
                name={"brand"}
                value={product.brand}
                onChange={handleChange}
              />
            </div>
            <div className="mb-1 flex flex-col">
              <Forms
                label={"Model:"}
                type={"text"}
                name={"model"}
                value={product.model}
                onChange={handleChange}
              />
            </div>
            <div className="mb-1 flex flex-col">
              <Forms
                label={"Category:"}
                type={"text"}
                name={"category"}
                value={product.category}
                onChange={handleChange}
              />
            </div>
            <div className="mb-1 flex flex-col">
              <label className="text-md font-semibold text-black mb-1">
                Description:
              </label>
              <textarea
                className="rounded-md bg-white text-black pl-2 border max-h-96 w-56 sm:w-96 hover:bg-neutral-200"
                name="description"
                value={product.description}
                onChange={handleChange}
              />
            </div>

            <Button
              className="bg-black border-none w-56 sm:w-96 rounded-3xl py-3 text-xl mt-2 mb-0 font-semibold text-white hover:bg-violet-500"
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
