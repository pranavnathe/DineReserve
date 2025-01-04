export default function Footer() {
    return (
        <footer className="bg-white rounded-lg shadow m-4 mb-24 sm:mb-0">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img
                            src="https://flowbite.com/docs/images/logo.svg"
                            className="h-8"
                            alt="Flowbite Logo"
                        />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap">
                            DineReserve
                        </span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0">
                        <li>
                            <a
                                href="https://www.linkedin.com/in/pranavnathe"
                                className="hover:underline me-4 md:me-6"
                            >
                                Linkedin
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/pranavnathe"
                                className="hover:underline me-4 md:me-6"
                            >
                                Github
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:askpranavnathe@gmail.com"
                                className="hover:underline"
                            >
                                Email
                            </a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center">
                    © {new Date().getFullYear()}{" "}
                    <a
                        href="https://pranavnathe.com/"
                        className="hover:underline"
                    >
                        Pranav Nathe™
                    </a>
                </span>
            </div>
        </footer>
    );
}
