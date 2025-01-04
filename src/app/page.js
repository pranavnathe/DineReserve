import Image from "next/image";
import Card from "./components/Card";
import restaurants from "../../data";
import Footer from "./components/Footer";
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-screen overflow-auto">
            {/* Top Section with Image */}
            <div className="relative h-1/2 w-full">
                <Image
                    src="/dining.jpg"
                    alt="Dining"
                    layout="fill"
                    objectFit="cover"
                    className="z-0"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white px-4 py-8">
                    <Link
                        href="/orders"
                        className="flex justify-end w-full max-w-screen-lg"
                    >
                        <span className="px-4 py-1 bg-white text-gray-800 text-base rounded-lg">
                            Orders
                        </span>
                    </Link>
                    <div className="flex flex-col items-center justify-end text-white max-w-3xl h-[28svh]">
                        <h1 className="auto text-4xl md:text-6xl font-extrabold ">
                            DineReserve
                        </h1>
                        <p className="mt-4 text-2xl md:text-4xl md:mt-8 px-10 text-center">
                            Discover Great Places to Eat
                        </p>
                    </div>
                    <div className="w-full max-w-lg mt-auto">
                        <div className="flex">
                            <input
                                type="text"
                                placeholder="Search for restaurants"
                                className="flex-grow px-1 py-3 rounded-l-md focus:outline-none text-gray-800"
                            />
                            <button className="bg-red-500 text-white px-6 py-3 rounded-r-md hover:bg-red-600">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="h-auto bg-white flex justify-center items-center">
                <div className="px-4 py-8 md:px-16 w-full max-w-screen-lg">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
                        Explore Restaurants
                    </h2>
                    <p className="mt-4 text-gray-600">
                        Discover the best places to dine, drink, and celebrate
                        in your city.
                    </p>

                    {/* Sample Content */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {restaurants.map((item) => (
                            <Link
                                key={item.srno}
                                href={`/restaurants/${item.srno}`}
                            >
                                <Card
                                    name={item.name}
                                    image={item.image}
                                    cuisine={item.cuisine}
                                    rating={item.rating}
                                    location={item.location}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
