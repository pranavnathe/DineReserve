import React from "react";

export default function SuccessPage() {
    return (
        <div className="h-[100svh] grid grid-cols-1">
            {/* Left Section: Green Background with Tick and Message */}
            <div className="bg-green-700 md:h-[50vh] flex flex-col items-center justify-center text-white px-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-20 w-20 mb-4 md:mb-10 bg-white text-green-700 rounded-full"
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
                <div className="w-full max-w-lg">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                        Restaurant Details
                    </h2>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            Restaurant:
                        </h3>
                        <p className="text-gray-600">The Urban Spoon</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            Date:
                        </h3>
                        <p className="text-gray-600">January 15, 2025</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            Time:
                        </h3>
                        <p className="text-gray-600">7:00 PM</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-700">
                            Address:
                        </h3>
                        <p className="text-gray-600">Sadar, Nagpur</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
