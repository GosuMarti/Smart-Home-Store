import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Shop from "../components/ui/productComponents/Shop";
import NavBar from "../components/ui/navigation/NavBar";
import { useAuth } from "../auth/AuthContext ";
import { RoundedTwoDecimals } from "../components/RoundedTwoDecimals";

const Product = () => {
  const { userInfo } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterCriteria, setFilterCriteria] = useState("Price: High-low");
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = [
    "All",
    "Panels",
    "Modules",
    "Accessories",
    "Sensors and alarms",
    "Voice assistant",
    "Promotional",
  ];
  const sortingOptions = [
    "Price: High-low",
    "Price: Low-High",
    "Sort: A-Z",
    "Sort: Z-A",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      let url = "http://localhost:8080/products";
      if (selectedCategory === "Promotional") {
        url = "http://localhost:8080/promotional";
      } else if (selectedCategory !== "All") {
        url = `http://localhost:8080/${selectedCategory}`;
      }

      try {
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (selectedCategory) {
      fetchProducts();
    }
  }, [selectedCategory]);

  useEffect(() => {
    const applyFilter = () => {
      let filteredProducts = [...products];

      if (filterCriteria === "Price: High-low") {
        filteredProducts.sort((a, b) => b.currentPrice - a.currentPrice);
      } else if (filterCriteria === "Price: Low-High") {
        filteredProducts.sort((a, b) => a.currentPrice - b.currentPrice);
      }

      if (filterCriteria === "Sort: A-Z") {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filterCriteria === "Sort: Z-A") {
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      }

      if (userInfo?.userType === "ADMIN" || userInfo?.userType === "EMPLOYEE") {
        if (searchTerm.trim() !== "") {
          filteredProducts = filteredProducts.filter((product) =>
            product.id.toString().includes(searchTerm)
          );
        }
      } else {
        if (searchTerm.trim() !== "") {
          filteredProducts = filteredProducts.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      }

      setFilteredProducts(filteredProducts);
    };

    applyFilter();
  }, [products, filterCriteria, searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <NavBar />

      <div className="flex flex-col">
        <h1 className="flex justify-center mt-20 text-4xl text-violet-500">
          Products
        </h1>

        <div className="flex flex-col sm:flex-row justify-center mx-5 sm:mx-0  mb-20 mt-5 lg:mt-12 gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder={
              userInfo?.userType === "EMPLOYEE" ||
              userInfo?.userType === "ADMIN"
                ? "Search by id..."
                : "Search by name..."
            }
            className="input input-bordered flex items-center bg-white"
          />
          <select
            className="block appearance-none border border-gray-200 text-gray-400 rounded-md py-3 pl-1 pr-6 bg-white leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className="block appearance-none border border-gray-200 text-gray-400 rounded-md py-3 pl-1 pr-6 bg-white leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
          >
            {sortingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center mt-6 lg:mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-5 mb-5">
          {filteredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Shop
                id={product.id}
                title={product.name}
                image={product.photo}
                discount={product.discount}
                priceOriginal={RoundedTwoDecimals(product.originalPrice)}
                priceCurrent={RoundedTwoDecimals(product.currentPrice)}
                buttonName={"Add to cart"}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        {(userInfo?.userType === "ADMIN" ||
          userInfo?.userType === "EMPLOYEE") && (
          <Link to="/add-product">
            <button className="bg-violet-600 border-none rounded-3xl py-3 w-96 text-xl my-5 font-semibold text-white hover:bg-violet-700">
              Add Products
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Product;
