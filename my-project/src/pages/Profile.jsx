import React, { useState, useEffect } from "react";
import BackgroundPhoto from "../components/ui/photoComponents/BackgroundPhoto";
import Avatar from "../components/ui/photoComponents/Avatar";
import Stat from "../components/profileComponents/Stat";
import Users from "../components/profileComponents/Users";
import Order from "../components/profileComponents/PreviousOrder";
import axios from "axios";
import { useAuth } from "../auth/AuthContext ";
import { Link } from "react-router-dom";

const Profile = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const { userInfo } = useAuth();
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        console.error("No JWT token found.");
        return;
      }
      if (userInfo?.userType === "ADMIN" || userInfo?.userType === "EMPLOYEE") {
        try {
          const response = await axios.get("http://localhost:8080/user", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          setUsers(response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    if (userInfo) {
      fetchUsers();
    }
  }, [userInfo, token]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!token || userInfo?.userType !== "CUSTOMER" || !userInfo?.id) {
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/clientOrder/${userInfo.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 204) {
          setOrders([]);
        } else {
          const ordersWithDetails = await Promise.all(
            response.data.map(async (order) => {
              const detailsResponse = await axios.get(
                `http://localhost:8080/order/${order.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return { ...order, details: detailsResponse.data };
            })
          );
          setOrders(ordersWithDetails);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userInfo, token]);

  return (
    <>
      <div className="bg-white min-h-screen">
        <BackgroundPhoto />
        <div className="w-full h-0 flex justify-center items-center">
          <Link to="/change-photo">
            <Avatar photoURL={userInfo?.photo} />
          </Link>
        </div>
        <div className="h-auto text-center mt-32">
          <h1 className="text-4xl font-semibold text-black">
            {userInfo ? userInfo.name : "Loading..."}
          </h1>
        </div>
        <div className="mt-5">
          <div>
            {userInfo?.userType === "ADMIN" && (
              <div
                className="hero h-96 relative"
                style={{
                  backgroundImage:
                    "url(https://i.pinimg.com/originals/7e/28/60/7e28602ba1959db39fa98d84655fe7a2.jpg)",
                }}
              >
                <div className="hero-overlay bg-opacity-10 absolute inset-0"></div>
                <div className="hero-content flex justify-center items-center text-white">
                  <div className="max-w-md text-center">
                    <h1 className="mb-5 text-4xl font-bold text-zinc-700">
                      Revenue:
                    </h1>
                    <Stat />
                  </div>
                </div>
              </div>
            )}

            <div className="overflow-x-auto mt-5">
              {(userInfo?.userType === "ADMIN" ||
                userInfo?.userType === "EMPLOYEE") && (
                <table className="table bg-zinc-800 rounded-none  ">
                  <Users users={users} />
                </table>
              )}
            </div>

            <div className=" mx-5">
              {orders.length === 0 && userInfo?.userType === "CUSTOMER" && (
                <h1 className="text-lg sm:text-2xl flex justify-center">
                  Uh-oh! It looks like you haven't placed any orders yet.
                </h1>
              )}

              {orders.map((order) => (
                <Order
                  key={order.id}
                  status={order.status}
                  phone={order.phoneNumber}
                  address={order.address}
                  time={order.orderDateTime}
                  price={order.value}
                  details={order.details}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
