// "use client";

import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Logo from "../../../public/images/Logo.png";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { isSignedIn } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Close menu when clicking on a link or scrolling
    const closeMenu = () => setIsOpen(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
            // Close menu when scrolling
            if (isOpen) {
                closeMenu();
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isOpen]);

    // Close menu when route changes
    useEffect(() => {
        closeMenu();
    }, [pathname]);

    // Navigation links
    const navLinks = [
        { name: "India", href: "/India" },
        { name: "Global", href: "/news" },
        { name: "Bollywood", href: "/bollywood" },
        { name: "Sports", href: "/sport" },
        { name: "Stocks", href: "/Stocks" },
        { name: "Crypto", href: "/crypto" },
        { name: "About-Us", href: "/Team" },
    ];

    // Check if link is active
    const isActive = (href) => {
        return pathname === href ||
            (href !== "/" && pathname.startsWith(href));
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed w-full z-50 flex justify-between items-center p-4 ${isScrolled
                ? "bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm"
                : "bg-white/90 backdrop-blur-md"
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
                        className={`px-3 py-1 rounded-md text-sm lg:text-base transition-colors ${isActive(link.href)
                            ? "bg-purple-100 border border-gray-100 text-gray-900 font-medium"
                            : "text-gray-700 hover:text-purple-600 hover:bg-gray-50"
                            }`}
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
                    className="p-2 text-gray-700 focus:outline-none z-50"
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Background Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            onClick={closeMenu}
                        />

                        {/* Mobile Menu Content */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="fixed top-16 left-0 right-0 bg-white z-40 shadow-lg rounded-b-lg mx-4 overflow-hidden"
                        >
                            <div className="flex flex-col p-4 space-y-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`px-4 py-3 rounded-lg text-base font-medium ${isActive(link.href)
                                            ? "bg-purple-100 text-purple-800"
                                            : "text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                {!isSignedIn && (
                                    <Link href="/sign-in" className="mt-2">
                                        <Button className="w-full">Login</Button>
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </>
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