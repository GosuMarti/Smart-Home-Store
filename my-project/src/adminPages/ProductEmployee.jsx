import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/ui/navigation/NavBar";

import DisplayDeletedProducts from "./DisplayDeletedProducts";

import { useAuth } from "../auth/AuthContext ";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductEmployee = () => {
  const [deletedProducts, setDeletedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterCriteria, setFilterCriteria] = useState("Price: High-low");
  const [filteredDeletedProducts, setFilteredDeletedProducts] = useState([]);
  const { userInfo } = useAuth();
  const token = localStorage.getItem("jwtToken");

  const navigate = useNavigate();

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
    fetchDeletedProducts();
  }, [userInfo]);

  useEffect(() => {
    const applyFilter = () => {
      let filtered = deletedProducts;

      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (selectedCategory !== "All") {
        filtered = filtered.filter(
          (product) => product.category === selectedCategory
        );
      }

      if (filterCriteria === "Price: High-low") {
        filtered.sort((a, b) => b.currentPrice - a.currentPrice);
      } else if (filterCriteria === "Price: Low-High") {
        filtered.sort((a, b) => a.currentPrice - b.currentPrice);
      } else if (filterCriteria === "Sort: A-Z") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (filterCriteria === "Sort: Z-A") {
        filtered.sort((a, b) => b.name.localeCompare(a.name));
      }

      setFilteredDeletedProducts(filtered);
    };

    applyFilter();
  }, [deletedProducts, searchTerm, selectedCategory, filterCriteria]);

  const fetchDeletedProducts = async () => {
    if (userInfo?.userType === "ADMIN") {
      if (!token) {
        console.error("No JWT token found.");
        return;
      }
      const url = "http://localhost:8080/deletedProducts";
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDeletedProducts(response.data);
      } catch (error) {
        console.error("Error fetching deleted products:", error);
      }
    }
  };

  const handleReturnToSale = (productId) => {
    setDeletedProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <NavBar />

      <div className="flex flex-col">
        <h1 className="flex justify-center mt-20 text-4xl text-violet-500">
          Deleted Products
        </h1>

        <div className="flex flex-col sm:flex-row justify-center mx-5 sm:mx-0 mb-20 mt-5 lg:mt-12 gap-3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search by id..."
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

      <div className="flex justify-center mt-6 lg:mt-12 mb-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-5">
          {userInfo?.userType === "ADMIN" && (
            <>
              {filteredDeletedProducts.map((product) => (
                <Link key={product.id} to={`/productEmployee/${product.id}`}>
                  <DisplayDeletedProducts
                    key={product.id}
                    id={product.id}
                    title={product.name}
                    priceCurrent={product.currentPrice.toFixed(2)}
                    priceOriginal={product.originalPrice.toFixed(2)}
                    image={product.photo}
                    discount={product.discount}
                    onReturnToSale={handleReturnToSale}
                  />
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductEmployee;
