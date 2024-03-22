import React, { useState } from "react";
import UserInput from "../components/ui/UserInput";
import Buttom from "../components/ui/Buttom";
import { useNavigate } from "react-router-dom";
import { isAlphanumeric } from "../validation/Validation";

const Login = ({ isLoggedIn }) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const [showCaution, setShowCaution] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      setShowCaution(!isAlphanumeric(value));
    }
    if (name === "password") {
      setShowCaution(!isAlphanumeric(value));
    }
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = values;

    if (username === "user" && password === "123456") {
      isLoggedIn(true);
      navigate("/");
    } else {
      console.log("No match");
      setShowCaution(true);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-pink-100 to-orange-200">
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
                value={values.username}
                onChange={handleChange}
              />
              <UserInput
                type={"password"}
                placeholder={"Passsword:"}
                name={"password"}
                value={values.password}
                onChange={handleChange}
              />
              {showCaution && (
                <p className="text-red-500 text-xs">
                  Incorrect Username or Password.
                </p>
              )}
              <Buttom textMessage={"Login now"} />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
