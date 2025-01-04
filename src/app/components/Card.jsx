import Image from "next/image";

export default function Card({ name, image, cuisine, rating, location }) {
    return (
        <div className="bg-white shadow-lg rounded-lg overflow-hidden sm:max-w-80 px-2 md:px-0">
            {/* Restaurant Image */}
            <div className="relative h-44 w-full">
                <Image
                    src={image}
                    alt={name}
                    layout="fill"
                    objectFit="cover"
                    className="object-center rounded-3xl"
                />
            </div>

            {/* Restaurant Info */}
            <div className="px-2 py-2">
                <div className="flex justify-between">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                        {name}
                    </h3>
                    <div class="flex items-center bg-green-700 px-2 rounded-lg">
                        <svg
                            class="w-3 h-3 text-yellow-300"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                        >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                        <p class="ms-1 text-sm w-5 font-bold text-gray-900 dark:text-white">
                            {rating}
                        </p>
                    </div>
                </div>
                <p className="text-sm md:text-base text-gray-600">{cuisine}</p>
                <p className="text-sm md:text-base text-gray-500">{location}</p>
            </div>
        </div>
    );
}
