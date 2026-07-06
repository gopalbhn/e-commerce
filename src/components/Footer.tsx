import { FaEnvelope, FaGlobe } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="h-full w-full px-10">
            <footer className="w-full bg-[#f8f5f4] ">
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-4 gap-6">

                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">
                                Lumina Marketplace
                            </h2>

                            <p className="mt-4 text-sm text-gray-600 leading-6">
                                Bringing you the world's most curated selection of lifestyle
                                goods. Designed for the modern consumer who values quality and
                                aesthetic integrity.
                            </p>
                        </div>

                        <div className="flex items-center gap-5 mt-6 text-gray-700">
                            <a href="#" className="hover:text-black transition">
                                <FaGlobe size={18} />
                            </a>

                            <a href="#" className="hover:text-black transition">
                                <FaEnvelope size={18} />
                            </a>

                            <a href="#" className="hover:text-black transition">
                                <FaShareNodes size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-5">
                            Company
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-black transition">About Us</a></li>
                            <li><a href="#" className="hover:text-black transition">Help Center</a></li>
                            <li><a href="#" className="hover:text-black transition">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-5">
                            Customer Care
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><a href="#" className="hover:text-black transition">Shipping Info</a></li>
                            <li><a href="#" className="hover:text-black transition">Returns</a></li>
                            <li><a href="#" className="hover:text-black transition">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col min-w-0">
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-5">
                            Join the Platform
                        </h3>

                        <div className="flex rounded-md overflow-hidden border border-gray-300">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex w-full px-4 py-3 text-sm outline-none bg-white"
                            />
                            <button className="bg-[#9B5A45] hover:bg-[#844937] text-white px-6 font-medium transition">
                                Join
                            </button>
                        </div>

                        <p className="mt-8 text-xs text-gray-500">
                            © 2024 Lumina Marketplace. All rights reserved.
                        </p>
                    </div>

                </div>
            </footer>
        </div>
    );
};

export default Footer;