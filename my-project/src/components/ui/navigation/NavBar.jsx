import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileNav from "./ProfileNav";
import Card from "../Card";
import { useAuth } from "../../../auth/AuthContext ";
import { useCart } from "../../../CartContext";
const NavBar = () => {
  const { userInfo, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState("");
  const { totalItems, totalPrice } = useCart();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  return (
    <div className="navbar bg-transparent fixed z-50 flex items-center justify-center ">
      <div className="flex items-center bg-gray-300 opacity-95 rounded-full py-1 shadow">
        <div className="ml-1 sm:ml-2 mr-1 sm:mr-2">
          <Link to="/">
            <h1
              className={`btn ${
                currentPage === "/"
                  ? "bg-white text-black"
                  : "bg-transparent text-black"
              } border-none text-xs sm:text-lg cursor-pointer hover:bg-white font-semibold rounded-full shadow-none`}
            >
              Home
            </h1>
          </Link>
        </div>
        <div className="mr-0 sm:mr-2">
          <Link to="/product">
            <h1
              className={`btn ${
                currentPage === "/product"
                  ? "bg-white text-black"
                  : "bg-transparent text-black"
              } border-none text-xs sm:text-lg cursor-pointer hover:bg-white font-semibold rounded-full shadow-none`}
            >
              Products
            </h1>
          </Link>
        </div>
        <div className="mr-0 sm:mr-2">
          <Link to="/about">
            <h1
              className={`btn ${
                currentPage === "/about"
                  ? "bg-white text-black"
                  : "bg-transparent text-black"
              } border-none text-xs sm:text-lg  cursor-pointer hover:bg-white font-semibold rounded-full shadow-none`}
            >
              About
            </h1>
          </Link>
        </div>
        <div>
          {!isAuthenticated && (
            <div className="mr-0 sm:mr-2">
              <Link to="/login">
                <h1
                  className={`btn ${
                    currentPage === "/login"
                      ? "bg-white text-black"
                      : "bg-transparent text-black"
                  } border-none text-xs sm:text-lg cursor-pointer hover:bg-white font-semibold rounded-full shadow-none`}
                >
                  Login
                </h1>
              </Link>
            </div>
          )}
        </div>
        {userInfo?.userType === "CUSTOMER" && (
          <div className="mr-0 sm:mr-1">
            <Card cartQuantity={totalItems} cartPrice={totalPrice} />
          </div>
        )}
        {isAuthenticated && (
          <div className="mr-1 sm:mr-2">
            <ProfileNav />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
