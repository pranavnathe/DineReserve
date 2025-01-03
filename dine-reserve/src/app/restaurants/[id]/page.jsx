"use client";
import { useParams, useRouter } from "next/navigation";
import restaurants from "../../../../data.js";
import { useState, useEffect, useRef } from "react";
import Footer from "@/app/components/Footer.jsx";

export default function RestaurantDetails() {
    const router = useRouter();
    const { id } = useParams();
    const restaurant = restaurants.find((res) => res.srno === parseInt(id));

    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    ); // Default to today's date
    const [selectedGuests, setSelectedGuests] = useState(1); // Default to 1 guest
    const [selectedSlot, setSelectedSlot] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");

    const modalRef = useRef(null);

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

    const getAvailableSlots = (date) => {
        const slots = [
            "6:00 PM",
            "6:30 PM",
            "7:00 PM",
            "7:30 PM",
            "8:00 PM",
            "8:30 PM",
            "9:00 PM",
            "9:30 PM",
        ];
        if (date === new Date().toISOString().split("T")[0]) {
            const currentHour = new Date().getHours();
            const currentMinute = new Date().getMinutes();
            const currentTimeInMinutes = currentHour * 60 + currentMinute;

            return slots.filter((slot) => {
                const [hour, minutePart] = slot.split(":");
                const timeInMinutes =
                    parseInt(hour) * 60 + parseInt(minutePart.slice(0, 2));
                return timeInMinutes > currentTimeInMinutes;
            });
        }
        return slots;
    };

    const handleBookNow = () => {
        setIsModalOpen(true);
    };

    const handleModalSubmit = () => {
        console.log("Booking Details", {
            selectedDate,
            selectedGuests,
            selectedSlot,
            mobile,
            email,
        });
        setIsModalOpen(false);
    };

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener("click", handleOutsideClick);
        } else {
            document.removeEventListener("click", handleOutsideClick);
        }
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [isModalOpen]);

    const isMobileValid = mobile.match(/^\d{10}$/); // Exactly 10 digits
    const isEmailValid = email.includes("@") && email.endsWith(".com"); // Basic email validation
    const isConfirmButtonEnabled = isMobileValid && isEmailValid;

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
            <div className="bg-white shadow-lg p-4 flex items-center">
                <button onClick={() => router.back()} className="mr-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-700"
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
                </button>
                <h1 className="text-lg font-semibold text-gray-800">
                    Back to Restaurants
                </h1>
            </div>

            {/* Restaurant Image */}
            <div className="w-full h-64 md:h-96 relative">
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-5xl mx-auto p-4">
                {/* Restaurant Details */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {restaurant.name}
                    </h1>
                    <p className="text-gray-600 mt-2">{restaurant.cuisine}</p>
                    <p className="text-gray-500 mt-1">{restaurant.location}</p>
                    <p className="mt-4 text-lg font-semibold flex items-center gap-4">
                        Rating:{" "}
                        <svg
                            className="w-4 h-4 text-yellow-300 me-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        {restaurant.rating} / 5
                    </p>
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
                        {selectedDate
                            ? getAvailableSlots(selectedDate).length > 0
                                ? getAvailableSlots(selectedDate).map(
                                      (slot, index) => (
                                          <button
                                              key={index}
                                              className={`px-4 py-2 rounded-lg border ${
                                                  selectedSlot === slot
                                                      ? "bg-green-500 text-white"
                                                      : "bg-gray-100 text-gray-800"
                                              } hover:bg-green-500 hover:text-white transition`}
                                              onClick={() =>
                                                  setSelectedSlot(slot)
                                              }
                                          >
                                              {slot}
                                          </button>
                                      )
                                  )
                                : "No slots available for today."
                            : "Please select a date."}
                    </div>

                    <button
                        className={`w-full px-4 py-2 rounded-lg text-white font-semibold ${
                            selectedDate && selectedGuests && selectedSlot
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-gray-300 cursor-not-allowed"
                        }`}
                        disabled={
                            !(selectedDate && selectedGuests && selectedSlot)
                        }
                        onClick={handleBookNow}
                    >
                        Book Now
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div
                        ref={modalRef}
                        className="bg-white p-6 rounded-lg shadow-lg w-96 border relative"
                    >
                        <button
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            onClick={() => setIsModalOpen(false)}
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
                                Mobile Number
                            </label>
                            <input
                                type="tel"
                                className="w-full px-4 py-2 border border-gray-500 rounded-md"
                                placeholder="+91 9876543210"
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
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
                                className="w-full px-4 py-2 border border-gray-500 rounded-md"
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
                            className={`w-full px-4 py-2 rounded-lg ${
                                isConfirmButtonEnabled
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            disabled={!isConfirmButtonEnabled}
                            onClick={handleModalSubmit}
                        >
                            Confirm Booking
                        </button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}
