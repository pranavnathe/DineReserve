"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/booking`;

export default function OrdersPage() {
    const router = useRouter();
    const [mobile, setMobile] = useState("");
    const [error, setError] = useState("");
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState({});
    const [message, setMessage] = useState(
        "Enter the mobile number to fetch the order details."
    );

    const isMobileValid = /^\d{10}$/.test(mobile);

    const fetchOrders = async () => {
        if (!isMobileValid) {
            setError("Invalid mobile number. Must be 10 digits.");
            return;
        }
        setError("");
        setLoading(true);
        setMessage("");
        try {
            const response = await axios.get(`${API_URL}/mobile/${mobile}`);
            const bookings = response.data.bookings || [];
            setOrders(bookings);
            setMessage(
                bookings.length === 0
                    ? "No orders found for the given mobile number."
                    : ""
            );
        } catch (error) {
            console.error("Error fetching orders:", error);
            setMessage("Failed to fetch orders. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const deleteOrder = async (bookingId) => {
        setDeleting((prev) => ({ ...prev, [bookingId]: true }));
        try {
            const response = await axios.delete(`${API_URL}/${bookingId}`);
            alert(response.data.message);
            setOrders((prevOrders) =>
                prevOrders.filter((order) => order._id !== bookingId)
            );
            if (orders.length === 1) {
                setMessage("No orders found for the given mobile number.");
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            alert("Failed to delete the order. Please try again.");
        } finally {
            setDeleting((prev) => ({ ...prev, [bookingId]: false }));
        }
    };

    return (
        <div className="min-h-screen pb-20 sm:pb-2 bg-gray-100 flex flex-col items-center relative">
            {/* Back Button */}
            <button
                onClick={() => router.push("/")}
                className="absolute top-4 left-4 px-4 py-2 z-10 bg-white opacity-65 text-gray-800 backdrop-blur-md rounded-md shadow hover:bg-gray-300 flex items-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                Back to Home
            </button>

            <div className="relative h-[40vh] w-full mb-6">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/dining.jpg')" }}
                ></div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>

                {/* Text */}
                <div className="relative z-1 flex justify-center items-center h-full">
                    <h1 className="text-3xl md:text-5xl font-bold text-white">
                        Order Management
                    </h1>
                </div>
            </div>

            <div className="w-full max-w-3xl flex flex-col items-center px-4">
                {/* Mobile Number Input */}
                <div className="w-full max-w-md mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                        Enter Mobile Number
                    </label>
                    <input
                        type="text"
                        className={`w-full px-4 py-2 border rounded-md ${
                            error ? "border-red-500" : "border-gray-300"
                        }`}
                        value={mobile}
                        inputmode="numeric"
                        placeholder="Enter 10-digit mobile number"
                        onChange={(e) => {
                            setError("");
                            setMessage(
                                "Enter the mobile number to fetch the order details."
                            );
                            // Allow only digits in the input
                            const value = e.target.value.replace(/\D/g, "");
                            setMobile(value);
                        }}
                    />
                    {error && (
                        <p className="text-red-500 text-sm mt-2">{error}</p>
                    )}
                </div>

                {/* Fetch Orders Button */}
                <button
                    className={`px-6 py-2 rounded-lg text-white font-semibold ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    onClick={fetchOrders}
                    disabled={loading}
                >
                    {loading ? "Fetching Orders..." : "Get Orders"}
                </button>

                {/* Orders Section */}
                <div className="mt-8 w-full max-w-2xl">
                    {message && (
                        <p className="text-gray-600 text-center">{message}</p>
                    )}
                    {orders.map((order) => (
                        <div
                            key={order._id}
                            className="bg-white p-4 rounded-lg shadow-lg mb-4"
                        >
                            <h2 className="text-xl font-semibold text-gray-800 mb-2">
                                {order.restaurantName}
                            </h2>
                            <p className="text-gray-700">
                                <strong>Name:</strong> {order.customer.name}
                            </p>
                            <p className="text-gray-700">
                                <strong>Mobile:</strong> {order.customer.mobile}
                            </p>
                            <p className="text-gray-700">
                                <strong>Email:</strong> {order.customer.email}
                            </p>
                            <p className="text-gray-700">
                                <strong>Date:</strong>{" "}
                                {order.bookingDetails.date}
                            </p>
                            <p className="text-gray-700">
                                <strong>Time:</strong>{" "}
                                {order.bookingDetails.timeSlot}
                            </p>
                            <p className="text-gray-700">
                                <strong>Guests:</strong>{" "}
                                {order.bookingDetails.guests}
                            </p>
                            <button
                                className={`mt-4 w-full px-4 py-2 rounded-md text-white font-semibold ${
                                    deleting[order._id]
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-red-500 hover:bg-red-600"
                                }`}
                                onClick={() => deleteOrder(order._id)}
                                disabled={deleting[order._id]}
                            >
                                {deleting[order._id] ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
