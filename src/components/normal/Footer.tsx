import { FaEnvelope, FaGlobe } from "react-icons/fa";
import { FaShareNodes } from "react-icons/fa6";

const Footer = () => {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-10">
            <footer className="w-full bg-secondary text-white ">

                <div className="
                    max-w-7xl
                    mx-auto
                    px-5 sm:px-6 lg:px-8
                    py-8 sm:py-10 lg:py-12
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                    gap-8 lg:gap-10
                ">

                    {/* Brand */}
                    <div className="flex flex-col justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white font-fraunces">
                                Easy Mart
                            </h2>

                            <p className="
                                mt-4
                                text-sm
                                text-white
                                text-ibm-plex-mono
                                leading-6
                                max-w-md
                            ">
                                Bringing you the world's most curated selection of
                                lifestyle goods. Designed for the modern consumer
                                who values quality and aesthetic integrity.
                            </p>
                        </div>

                        <div className="flex items-center gap-5 mt-6 text-gray-700">
                            <a
                                href="#"
                                className="hover:text-accent text-white transition"
                                aria-label="Website"
                            >
                                <FaGlobe size={18} />
                            </a>

                            <a
                                href="#"
                                className="hover:text-accent text-white transition"
                                aria-label="Email"
                            >
                                <FaEnvelope size={18} />
                            </a>

                            <a
                                href="#"
                                className="hover:text-accent text-white transition"
                                aria-label="Share"
                            >
                                <FaShareNodes size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-5 text-white font-fraunces">
                            Company
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent text-white transition font-ibm-plex-mono"
                                >
                                    About Us
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent text-white transition font-ibm-plex-mono"
                                >
                                    Help Center
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent text-white transition font-ibm-plex-mono"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-5 text-white font-fraunces">
                            Customer Care
                        </h3>

                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent text-white transition font-ibm-plex-mono"
                                >
                                    Shipping Info
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent text-white transition font-ibm-plex-mono"
                                >
                                    Returns
                                </a>
                            </li>

                            <li>
                                <a
                                    href="#"
                                    className="hover:text-accent text-white transition font-ibm-plex-mono"
                                >
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="min-w-0">
                        <h3 className="text-sm font-bold uppercase tracking-wide mb-5 text-white font-fraunces">
                            Join the Platform
                        </h3>

                        <div className="
                            flex
                            w-full
                            rounded-md
                            overflow-hidden
                            border
                            border-gray-300
                            bg-white
                        ">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="
                                    min-w-0
                                    flex-1
                                    px-3 sm:px-4 font-ibm-plex-mono
                                    py-3
                                    text-sm
                                    outline-none
                                    bg-secondary
                                    border border-accent
                                    text-accent
                                "
                            />

                            <button className="
                                shrink-0
                                bg-accent
                                hover:bg-accent/70
                                text-white
                                px-4 sm:px-6
                                py-3
                                text-sm
                                font-medium
                                transition font-ibm-plex-mono
                            ">
                                Join
                            </button>
                        </div>

                        <p className="mt-6 lg:mt-8 text-xs text-white font-ibm-plex-mono">
                            © 2024 Lumina Marketplace. All rights reserved.
                        </p>
                    </div>

                </div>
            </footer>
        </div>
    );
};

export default Footer;