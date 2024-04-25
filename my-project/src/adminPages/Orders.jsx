import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { RoundedTwoDecimals } from "../components/RoundedTwoDecimals";
import { useAuth } from "../auth/AuthContext ";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { userInfo } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");

    const fetchOrders = () => {
      axios
        .get("http://localhost:8080/orders", {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((response) => {
          setOrders(response.data);
        })
        .catch((error) => {
          console.error("Error fetching orders: ", error);
        });
    };

    if (
      jwtToken &&
      (userInfo?.userType === "ADMIN" || userInfo?.userType === "EMPLOYEE")
    ) {
      fetchOrders();
    }
  }, [userInfo?.userType]);

  const changeOrderStatus = async (orderId, newStatus) => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      console.error("No JWT token found.");
      return;
    }

    axios
      .put(
        `http://localhost:8080/orderStatusChange/${orderId}`,
        {
          newStatus: newStatus,
          employeeId: userInfo?.id,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
      })
      .catch((error) => {
        console.error("Error updating order status: ", error);
      });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-300 to-violet-200 min-h-screen">
        <div className="container mx-auto pt-24 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <Link
              to="/"
              className="text-black bg-white hover:bg-violet-200 border-none font-bold rounded-full py-2 px-4"
            >
              Home
            </Link>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by Order ID..."
              className="input input-bordered bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full text-center text-gray-800">
              <thead>
                <tr className="text-black">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Client Name</th>
                  <th className="px-4 py-2">Address</th>
                  <th className="px-4 py-2">Phone Number</th>
                  <th className="px-4 py-2">Order Date</th>
                  <th className="px-4 py-2">Value</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Change Status</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .filter((order) => order.id.toString().includes(searchTerm))
                  .map((order) => (
                    <tr key={order.id}>
                      <td className="border px-4 py-2">{order.id}</td>
                      <td className="border px-4 py-2">{order.client.name}</td>
                      <td className="border px-4 py-2">{order.address}</td>
                      <td className="border px-4 py-2">{order.phoneNumber}</td>
                      <td className="border px-4 py-2 whitespace-nowrap">
                        {new Date(order.orderDateTime).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="border px-4 py-2">BGN {order.value}</td>
                      <td className="border px-4 py-2">{order.status}</td>
                      <td className="border px-4 py-2 ">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            changeOrderStatus(order.id, e.target.value)
                          }
                          className="rounded-md bg-white text-black pl-2 border min-h-10 w-20 sm:w-36 hover:bg-neutral-200 "
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="COMPLETED">COMPLETED</option>
                          <option value="CANCELED">CANCELED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
