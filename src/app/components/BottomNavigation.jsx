"use client";
import { useRouter } from "next/navigation";

export default function BottomNavigation() {
    const router = useRouter();

    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white/80 backdrop-blur-md border-t border-gray-300 sm:hidden">
            <div className="grid h-full max-w-md grid-cols-2 mx-auto font-medium">
                {/* Home Button */}
                <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-100 group"
                >
                    <svg
                        className="w-6 h-6 mb-1 text-gray-600 group-hover:text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 0L2 6v14h6v-6h4v6h6V6l-8-6z" />
                    </svg>
                    <span className="text-sm text-gray-600 group-hover:text-blue-500">
                        Home
                    </span>
                </button>

                {/* Orders Button */}
                <button
                    type="button"
                    onClick={() => router.push("/orders")}
                    className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-100 group"
                >
                    <svg
                        className="w-6 h-6 mb-1 text-gray-600 group-hover:text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9 18h2v-2H9v2zm-3-5h8v-1H6v1zm4-7c-1.1 0-2 .9-2 2 0 1.1.9 2 2 2s2-.9 2-2c0-1.1-.9-2-2-2zM1 5h18v12H1V5zm2 2v8h14V7H3z" />
                    </svg>
                    <span className="text-sm text-gray-600 group-hover:text-blue-500">
                        Orders
                    </span>
                </button>
            </div>
        </div>
    );
}
