import React from "react";
import { Link } from "react-router-dom";
import NavPhoto from "./NavPhoto";
import { useAuth } from "../../../auth/AuthContext ";

const Profile = () => {
  const { handleLogout, userInfo } = useAuth();

  return (
    <div className="dropdown dropdown-end ">
      <NavPhoto imageUrl={userInfo?.photo} />

      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-gray-200 rounded-box w-52"
      >
        <div className="ml-3 ">
          <button className="justify-between text-black ">
            <Link to={`/profile`}>Profile</Link>
          </button>
        </div>
        {(userInfo?.userType === "ADMIN" ||
          userInfo?.userType === "EMPLOYEE") && (
          <>
            <div className="ml-3 ">
              <button className="justify-between text-black ">
                <Link to="/orders">Orders</Link>
              </button>
            </div>

            <div className="ml-3 ">
              <button className="justify-between text-black ">
                <Link to="/product-display">Product Info</Link>
              </button>
            </div>
          </>
        )}
        {userInfo?.userType === "ADMIN" && (
          <>
            <div className="ml-3 ">
              <button className="justify-between text-black ">
                <Link to="/product-employee">Deleted products</Link>
              </button>
            </div>
            <div className="ml-3 ">
              <button className="justify-between text-black ">
                <Link to="/users">Users</Link>
              </button>
            </div>
          </>
        )}

        <div className="text-black ml-3">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </ul>
    </div>
  );
};

export default Profile;
