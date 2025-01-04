"use client";
import { useParams, useRouter } from "next/navigation";
import restaurants from "../../../../data.js";
import { useState, useEffect } from "react";
import axios from "axios";
import Footer from "@/app/components/Footer.jsx";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/booking`;

export default function RestaurantDetails() {
    const router = useRouter();
    const { id } = useParams();
    const restaurant = restaurants.find((res) => res.srno === parseInt(id));

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );
    const [selectedGuests, setSelectedGuests] = useState(1);
    const [selectedSlot, setSelectedSlot] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [slots, setSlots] = useState({
        availableSlots: [],
        unavailableSlots: [],
    });
    const [loadingSlots, setLoadingSlots] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const isMobileValid = mobile.match(/^\d{10}$/); // Exactly 10 digits
    const isEmailValid = email.includes("@") && email.endsWith(".com"); // Basic email validation

    const generateDates = () => {
        const dates = [];
        const today = new Date();
        const options = { weekday: "short", day: "2-digit", month: "short" };

        for (let i = 0; i < 5; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            dates.push({
                value: date.toISOString().split("T")[0],
                label: new Intl.DateTimeFormat("en-US", options).format(date),
            });
        }
        return dates;
    };

    const fetchSlots = async (date) => {
        setLoadingSlots(true);
        try {
            const response = await axios.post(`${API_URL}/slots`, {
                restaurantId: id,
                date,
            });
            setSlots({
                availableSlots: response.data.availableSlots || [],
                unavailableSlots: response.data.unavailableSlots || [],
            });
        } catch (error) {
            console.error("Error fetching slots:", error);
        } finally {
            setLoadingSlots(false);
        }
    };

    useEffect(() => {
        fetchSlots(selectedDate);
    }, [selectedDate]);

    const handleSlotClick = (slot, isAvailable) => {
        if (!isAvailable) {
            alert("This time slot is already booked.");
            return;
        }
        setSelectedSlot(slot);
    };

    const handleModalSubmit = async () => {
        setBookingLoading(true);
        try {
            const response = await axios.post(`${API_URL}`, {
                restaurantId: id,
                restaurantName: restaurant.name,
                customer: {
                    name,
                    mobile,
                    email,
                },
                bookingDetails: {
                    date: selectedDate,
                    timeSlot: selectedSlot,
                    guests: selectedGuests,
                },
            });
            router.push(`/success/${response.data.booking._id}`);
        } catch (error) {
            console.error("Error confirming booking:", error);
            alert("Failed to book the slot. Please try again.");
        } finally {
            setBookingLoading(false);
        }
    };

    const isConfirmButtonEnabled =
        name.trim().length > 0 &&
        /^\d{10}$/.test(mobile) &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isBookNowEnabled = selectedDate && selectedSlot;

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setErrors({});
    };

    if (!restaurant) {
        return (
            <div className="h-screen flex items-center justify-center">
                <h1 className="text-xl font-semibold text-gray-600">
                    Restaurant not found.
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="relative bg-gray-50">
                <button
                    onClick={() => router.push("/")}
                    className="absolute top-4 left-4 px-4 py-2 z-10 bg-white opacity-85 text-gray-800 backdrop-blur-md rounded-md shadow hover:bg-gray-300 flex items-center"
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
                <div className="w-full h-64 md:h-96 relative">
                    <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            <div className="max-w-5xl mx-auto p-4">
                {/* Restaurant Details */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {restaurant.name}
                    </h1>
                    <p className="text-gray-600 mt-2">{restaurant.cuisine}</p>
                    <p className="text-gray-500 mt-1">{restaurant.location}</p>
                </div>

                {/* Booking Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                        Select Your Booking Details
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-gray-600 mb-2 font-medium">
                                Date
                            </label>
                            <select
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                                value={selectedDate}
                                onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                }
                            >
                                {generateDates().map((date) => (
                                    <option key={date.value} value={date.value}>
                                        {date.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-2 font-medium">
                                Guests
                            </label>
                            <select
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-50"
                                value={selectedGuests}
                                onChange={(e) =>
                                    setSelectedGuests(e.target.value)
                                }
                            >
                                {[...Array(8)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1} {i === 0 ? "Guest" : "Guests"}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 mb-6">
                        {loadingSlots ? (
                            <div className="col-span-full text-center">
                                <p>Loading slots...</p>
                            </div>
                        ) : (
                            <>
                                {slots.availableSlots.map((slot) => (
                                    <button
                                        key={slot}
                                        className={`px-4 py-2 rounded-lg border bg-gray-100 text-gray-800 hover:bg-green-500 hover:text-white ${
                                            selectedSlot === slot
                                                ? "bg-green-500 text-white"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleSlotClick(slot, true)
                                        }
                                    >
                                        {slot}
                                    </button>
                                ))}
                                {slots.unavailableSlots.map((slot) => (
                                    <button
                                        key={slot}
                                        className="px-4 py-2 rounded-lg border bg-red-500 text-white cursor-not-allowed"
                                        onClick={() =>
                                            handleSlotClick(slot, false)
                                        }
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </>
                        )}
                    </div>

                    <button
                        className={`w-full px-4 py-2 rounded-lg text-white font-semibold ${
                            isBookNowEnabled
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-gray-300 cursor-not-allowed"
                        }`}
                        disabled={!isBookNowEnabled}
                        onClick={() => setIsModalOpen(true)}
                    >
                        Book Now
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    onClick={handleCloseModal}
                >
                    <div
                        className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={handleCloseModal}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <h2 className="text-lg font-bold mb-4">
                            Enter Your Details
                        </h2>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                className={`w-full px-4 py-2 border border-gray-500 rounded-md`}
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                className={
                                    "w-full px-4 py-2 border border-gray-500 rounded-md"
                                }
                                value={mobile}
                                inputmode="numeric"
                                placeholder="+91 9876543210"
                                onChange={(e) => {
                                    // Allow only digits in the input
                                    const value = e.target.value.replace(
                                        /\D/g,
                                        ""
                                    );
                                    setMobile(value);
                                }}
                            />
                            {!isMobileValid && mobile.length > 0 && (
                                <p className="text-red-500 text-sm mt-1">
                                    Please enter a valid 10-digit number.
                                </p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-600 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                className={`w-full px-4 py-2 border border-gray-500 rounded-md`}
                                placeholder="youremail@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {!isEmailValid && email.length > 0 && (
                                <p className="text-red-500 text-sm mt-1">
                                    Please enter a valid email with @ and .com.
                                </p>
                            )}
                        </div>
                        <button
                            className={`w-full px-4 py-2 rounded-lg text-white font-semibold ${
                                isConfirmButtonEnabled
                                    ? "bg-green-500 hover:bg-green-600"
                                    : "bg-gray-300 cursor-not-allowed"
                            }`}
                            disabled={!isConfirmButtonEnabled}
                            onClick={handleModalSubmit}
                        >
                            {bookingLoading ? "Booking..." : "Confirm Booking"}
                        </button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}
