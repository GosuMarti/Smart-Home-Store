import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../../auth/AuthContext ";

const Stat = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [revenue, setRevenue] = useState(null);
  const { userInfo } = useAuth();
  const token = localStorage.getItem("jwtToken");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (end < start) {
      alert(
        "The end date cannot be before the start date. Please correct the dates."
      );
      return;
    }

    const formattedStartDate = startDate + "T00:00:00";
    const formattedEndDate = endDate + "T23:59:59";

    const requestData = {
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    };

    if (!userInfo) {
      console.error("No JWT token found.");
      return;
    }
    if (userInfo?.userType === "ADMIN") {
      try {
        const response = await axios.post(
          "http://localhost:8080/revenue",
          requestData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRevenue(response.data);
      } catch (error) {
        console.error("Error fetching revenue:", error);
      }
    }
  };
  return (
    <div className="stats bg-transparent">
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit} className="w-full px-4 md:max-w-xl">
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
            <input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              className="border border-gray-400 rounded p-2 flex-grow"
            />
            <input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              className="border border-gray-400 rounded p-2 flex-grow"
            />
            <button
              type="submit"
              className="bg-zinc-500 font-semibold hover:bg-violet-700 text-white py-2 px-4 rounded flex-grow md:flex-grow-0"
            >
              Get Revenue
            </button>
          </div>
        </form>
        {revenue !== null && (
          <div className="bg-zinc-400 rounded-lg shadow-lg p-4 w-full md:max-w-md mt-4">
            <h1 className="text-white font-semibold text-xl">
              Total Revenue: BGN {revenue}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stat;
