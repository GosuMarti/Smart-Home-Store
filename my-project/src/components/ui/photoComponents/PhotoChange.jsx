import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../../auth/AuthContext ";
import Avatar from "./Avatar";

const PhotoChange = () => {
  const [newPhotoUrl, setNewPhotoUrl] = useState("");
  const { userInfo } = useAuth();
  const [feedback, setFeedback] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const token = localStorage.getItem("jwtToken");

  const handlePhotoUrlChange = (e) => {
    setNewPhotoUrl(e.target.value);
  };

  const handlePreSubmit = (e) => {
    e.preventDefault();
    setIsConfirmModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!token) {
      console.error("JWT Token not found.");
      setFeedback("Error: JWT Token not found.");
      return;
    }
    try {
      await axios.put(
        `http://localhost:8080/users/change-photo/${userInfo?.id}`,
        JSON.stringify(newPhotoUrl),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeedback("Photo updated successfully!");
      setNewPhotoUrl("");
      setRedirectToProfile(true);
    } catch (error) {
      console.error("Error updating user photo:", error);
      setFeedback("Error updating photo. Please try again.");
    }
  };

  const confirmChangePhoto = async () => {
    setIsConfirmModalOpen(false);
    handleSubmit();
  };

  if (redirectToProfile) {
    return <Navigate to={`/profile`} replace={true} />;
  }
  return (
    <div className="bg-gradient-to-r from-indigo-300 to-violet-200">
      <Link to="/" className="absolute top-0 right-0 m-4">
        <button className="text-md text-black bg-white hover:bg-violet-300 border-none font-bold rounded-full p-3">
          Home
        </button>
      </Link>

      <div className="flex flex-col gap-5 items-center justify-center min-h-screen ">
        <Avatar photoURL={newPhotoUrl || userInfo?.photo} />
        <form
          onSubmit={handlePreSubmit}
          className="flex flex-col justify-center items-center gap-4"
        >
          <input
            type="text"
            value={newPhotoUrl}
            onChange={handlePhotoUrlChange}
            placeholder="Enter new photo URL"
            className="input input-bordered bg-white w-full max-w-xs"
          />
          <button
            type="submit"
            className="bg-violet-400 hover:bg-violet-600 text-white font-semibold text-lg border-none p-2 rounded-lg"
          >
            Change Photo
          </button>
          {isConfirmModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded-lg">
                <p>Are you sure you want to change your photo?</p>
                <div className="flex justify-around mt-4">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-md"
                    onClick={() => setIsConfirmModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-md"
                    onClick={confirmChangePhoto}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
          {feedback && <div className="text-lg mt-4">{feedback}</div>}{" "}
        </form>
      </div>
    </div>
  );
};

export default PhotoChange;
