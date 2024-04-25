import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Forms from "./Forms";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext ";

const AddUser = () => {
  const navigate = useNavigate();
  const { userInfo } = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    userType: "",
  });
  const types = ["CUSTOMER", "EMPLOYEE"];

  const addUser = async (e) => {
    e.preventDefault();
    if (userInfo?.userType === "ADMIN") {
      try {
        const response = await axios.post(
          "http://localhost:8080/register",
          user,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          console.log("User added successfully!");

          setUser({
            name: "",
            email: "",
            username: "",
            password: "",
            userType: "",
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSelectUserType = (selectedType) => {
    setUser({ ...user, userType: selectedType });
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
          <Form onSubmit={addUser}>
            <div className="mb-1 flex flex-col">
              <Forms
                label={"Name:"}
                type={"text"}
                name={"name"}
                value={user.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-1 flex flex-col">
              <Forms
                label={"Email:"}
                type={"text"}
                name={"email"}
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-1 flex flex-col">
              <Forms
                label={"Username:"}
                type={"text"}
                name={"username"}
                value={user.username}
                onChange={handleChange}
              />
            </div>

            <div className="mb-1 flex flex-col">
              <Forms
                label={"Password:"}
                type={"password"}
                name={"password"}
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-md text-black font-semibold mb-1">
                Type:
              </label>
              <select
                name="userType"
                value={user.userType}
                onChange={(e) => handleSelectUserType(e.target.value)}
                className="py-2 px-3 rounded-lg border bg-white"
              >
                <option value="">Select User Type</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
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

export default AddUser;
