import React, { useEffect, useState } from "react";
import UserInput from "../components/ui/UserInput";
import { Link } from "react-router-dom";
import Buttom from "../components/ui/Buttom";
import { isValidEmail } from "../validation/Validation";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const [formError, setFormError] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });
  const [showCaution, setShowCaution] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (Object.keys(formError).length === 0) {
      console.log(formData);
    }
  }, [formError]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    }
    if (!regex.test(values.email)) {
      errors.email = "This is not valid email format!";
    }
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
      try {
        const response = await fetch("http://localhost:8080/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log("User signed up successfully!");
          navigate("/login");
        } else {
          setShowCaution(true);
          console.error("Error signing up:", response);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
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
        <div className="flex justify-center items-center h-screen">
          <div className="border-x-1 shadow-lg w-auto rounded-xl py-5 bg-white">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-auto mx-auto px-8"
            >
              <h1 className="text-3xl font-bold text-black mb-4">Sign In:</h1>{" "}
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
                type={"text"}
                placeholder={"Name:"}
                name={"name"}
                value={formData.name}
                onChange={handleChange}
              />
              <p className="text-xs text-red-600 font-semibold">
                {formError.name}
              </p>
              <UserInput
                type={"text"}
                placeholder={"Email:"}
                name={"email"}
                value={formData.email}
                onChange={handleChange}
              />
              <p className="text-xs text-red-600 font-semibold">
                {formError.email}
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
              {showCaution && (
                <p className="text-red-500 text-xs">
                  Incorrect Username or Password.
                </p>
              )}
              <p className="text-xs">
                Already have an account?
                <Link to="/login" className="text-violet-700">
                  Log in
                </Link>
              </p>
              <Buttom textMessage="Sign In now" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
