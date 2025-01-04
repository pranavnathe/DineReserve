"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/booking`;

export default function SuccessPage() {
    const router = useRouter();
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(`${API_URL}/${id}`);
                if (response.data.success) {
                    setBooking(response.data.booking);
                } else {
                    setError("Booking not found.");
                }
            } catch (err) {
                setError(
                    "An error occurred while fetching the booking details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg text-gray-600">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-lg text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="mb-20 sm:mb-10 grid grid-cols-1 relative">
            {/* Back to Home Button */}
            <button
                onClick={() => router.push("/")}
                className="absolute flex items-center top-4 left-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300"
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

            {/* Left Section: Green Background with Tick and Message */}
            <div className="bg-green-700 min-h-96 h-[50vh] flex flex-col items-center justify-center text-white px-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 mt-20 md:mt-0 mb-4 md:mb-10 bg-white text-green-700 rounded-full"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
                <h1 className="text-3xl md:text-4xl font-bold text-center">
                    Successfully Booked a Seat!
                </h1>
                <p className="mt-4 text-center text-lg">
                    Thank you for reserving a table. We look forward to serving
                    you!
                </p>
            </div>

            {/* Right Section: Restaurant Details */}
            <div className="bg-white flex flex-col justify-center items-center px-6">
                <div className="w-full max-w-lg mt-6">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                        Restaurant Details
                    </h2>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            Restaurant:
                        </h3>
                        <p className="text-gray-600">
                            {booking.restaurantName}
                        </p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            Date:
                        </h3>
                        <p className="text-gray-600">
                            {booking.bookingDetails.date}
                        </p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            Time:
                        </h3>
                        <p className="text-gray-600">
                            {booking.bookingDetails.timeSlot}
                        </p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            Guests:
                        </h3>
                        <p className="text-gray-600">
                            {booking.bookingDetails.guests}
                        </p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            Customer Name:
                        </h3>
                        <p className="text-gray-600">{booking.customer.name}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                            Contact:
                        </h3>
                        <p className="text-gray-600">
                            Mobile: {booking.customer.mobile}
                        </p>
                        <p className="text-gray-600">
                            Email: {booking.customer.email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
