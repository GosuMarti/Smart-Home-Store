import React, { useState, useEffect } from "react";
import UserInput from "../components/ui/UserInput";
import Buttom from "../components/ui/Buttom";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext ";
import { useCart } from "../CartContext";
import axios from "axios";

const Login = () => {
  const { handleLogin } = useAuth();
  const { clearCart } = useCart();

  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showCaution, setShowCaution] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formData);
    setFormError(errors);
    if (Object.keys(errors).length === 0) {
      axios
        .post("http://localhost:8080/login", formData)
        .then(({ data }) => {
          handleLogin(data.userInfoDto, data.accessToken);
          clearCart();
        })
        .catch((error) => {
          console.error("Login error", error);
          setShowCaution(true);
        });
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-300 to-violet-200">
        <Link to="/" className="absolute top-0 right-0 m-4">
          <button className="text-md text-black bg-white hover:bg-violet-300 border-none font-bold rounded-full p-3">
            Home
          </button>
        </Link>
        <div className="flex justify-center items-center h-screen ">
          <div className="border-x-1 shadow-lg w-auto rounded-xl py-5 bg-white">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-auto mx-auto px-8"
            >
              <h1 className="text-3xl font-bold text-black mb-4">Log in:</h1>
              <UserInput
                type={"text"}
                placeholder={"Username:"}
                name={"username"}
                value={formData.username}
                onChange={handleChange}
              />
              <p className="text-xs text-red-600 font-semibold">
                {formError.username}
              </p>
              <UserInput
                type={"password"}
                placeholder={"Password:"}
                name={"password"}
                value={formData.password}
                onChange={handleChange}
              />
              <p className="text-xs text-red-600 font-semibold">
                {formError.password}
              </p>
              <h6 className="text-xs">
                Don't have an account?{" "}
                <Link to="/signup" className="text-violet-700">
                  Sign Up
                </Link>
              </h6>

              <Buttom textMessage={"Login now"} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
