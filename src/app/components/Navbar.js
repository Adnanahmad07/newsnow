"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Logo from "../../../public/images/Logo.png";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { isSignedIn } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Close menu when clicking on a link
    const closeMenu = () => setIsOpen(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Navigation links
    const navLinks = [
        { name: "Global", href: "/news" },
        { name: "India", href: "/India" },
        { name: "Bollywood", href: "/bollywood" },
        { name: "Sports", href: "/sport" },
        { name: "Stocks", href: "/Stocks" },
        { name: "Crypto", href: "/crypto" },
        { name: "About-Us", href: "/Team" },
    ];

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 flex justify-between items-center p-4 ${isScrolled
                    ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
                    : "bg-white/30 backdrop-blur-md"
                }`}
        >
            {/* Logo and Brand Name */}
            <Link href="/" className="flex items-center gap-2 z-50">
                <div className="rounded-full overflow-hidden">
                    <Image
                        src={Logo}
                        alt="NewsNow Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                        priority
                    />
                </div>
                <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="hidden sm:flex items-center gap-1"
                >
                    <span className="text-red-800 font-bold text-xl sm:text-2xl">N</span>
                    <span className="text-black text-lg sm:text-xl">ews</span>
                    <span className="text-red-800 font-bold text-xl sm:text-2xl">N</span>
                    <span className="text-black text-lg sm:text-xl">ow</span>
                </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="hidden md:flex items-center gap-4 lg:gap-6"
            >
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="text-gray-700 hover:text-purple-600 transition-colors text-sm lg:text-base"
                    >
                        {link.name}
                    </Link>
                ))}
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
                {isSignedIn ? (
                    <UserButton afterSignOutUrl="/" />
                ) : (
                    <Link href="/sign-in">
                        <Button variant="outline" size="sm">
                            Login
                        </Button>
                    </Link>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 text-gray-700 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden fixed inset-0 top-16 bg-white z-40 pt-8 px-6 shadow-lg"
                    >
                        <div className="flex flex-col space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={closeMenu}
                                    className="text-gray-700 hover:text-purple-600 text-lg py-2 border-b border-gray-100"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4">
                                {!isSignedIn && (
                                    <Link href="/sign-in" onClick={closeMenu}>
                                        <Button className="w-full">Login</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Auth Button */}
            <div className="hidden md:block">
                {isSignedIn ? (
                    <UserButton afterSignOutUrl="/" afterSignInUrl="/News" showName />
                ) : (
                    <Link href="/sign-in">
                        <Button variant="outline">Login</Button>
                    </Link>
                )}
            </div>
        </motion.nav>
    );
}