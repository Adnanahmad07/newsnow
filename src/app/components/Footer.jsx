"use client"; // Required for Framer Motion and interactivity

import { motion } from "framer-motion";
import { FaWhatsapp, FaTelegram, FaInstagram, FaTwitter } from "react-icons/fa"; // Icons from react-icons
import { Sun, Moon, Monitor } from "lucide-react"; // Icons for dark/light/system

const Footer = () => {
    return (
        <footer

            className="bg-black text-white py-12"
        >
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* First Div: Brand Name, Subheadline, and Social Icons */}
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold">NewsNow</h2>
                    <p className="text-gray-400">Stay updated with the latest news and stock updates.</p>
                    <div className="flex space-x-4">
                        <a href="#" aria-label="WhatsApp">
                            <FaWhatsapp className="text-gray-400 hover:text-white transition-colors" />
                        </a>
                        <a href="#" aria-label="Telegram">
                            <FaTelegram className="text-gray-400 hover:text-white transition-colors" />
                        </a>
                        <a href="#" aria-label="Instagram">
                            <FaInstagram className="text-gray-400 hover:text-white transition-colors" />
                        </a>
                        <a href="#" aria-label="Twitter">
                            <FaTwitter className="text-gray-400 hover:text-white transition-colors" />
                        </a>
                    </div>
                </div>

                {/* Second Div: Resources */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Resources</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Documentation
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Tutorials
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                Support
                            </a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                API Status
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Third Div: Routes */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Routes</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="/" className="text-gray-400 hover:text-white transition-colors">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/stocks" className="text-gray-400 hover:text-white transition-colors">
                                Stocks
                            </a>
                        </li>
                        <li>
                            <a href="/india" className="text-gray-400 hover:text-white transition-colors">
                                India
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Fourth Div: Theme Toggle Icons */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Theme</h3>
                    <div className="flex space-x-4">
                        <button aria-label="Light Mode">
                            <Sun className="text-gray-400 hover:text-white transition-colors" />
                        </button>
                        <button aria-label="Dark Mode">
                            <Moon className="text-gray-400 hover:text-white transition-colors" />
                        </button>
                        <button aria-label="System Default">
                            <Monitor className="text-gray-400 hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;