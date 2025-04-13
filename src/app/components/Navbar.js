"use client"; // Mark this component as a Client Component

import { UserButton, useUser } from "@clerk/nextjs"; // Import useUser hook
import Image from "next/image";
import Logo from "../../../public/images/Logo.png";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

export default function Navbar() {
    const { isSignedIn } = useUser(); // Get the user's sign-in status

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-between items-center bg-white/30 backdrop-blur-md p-4 border border-purple-300/30 shadow-lg shadow-purple-500/10"
        >
            {/* Logo and NewsNow Text */}
            <Link href="/" className="flex items-center gap-2">
                {/* Logo with rounded border */}
                <div className="rounded-full overflow-hidden">
                    <Image
                        src={Logo}
                        alt="NewsNow Logo"
                        width={60} // Adjust the width as needed
                        height={60} // Adjust the height as needed
                        className="rounded-full"
                    />
                </div>

                {/* NewsNow Text */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex items-center gap-2"
                >
                    <span className="cursor-pointer">
                        <span className="text-red-800 font-bold text-2xl">N</span>
                        <span className="text-black text-xl">ews</span>
                        <span className="text-red-800 font-bold text-2xl">N</span>
                        <span className="text-black text-xl">ow</span>
                    </span>
                </motion.div>
            </Link>

            {/* Navigation Links */}


            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-8 mr-12"
            >
                <Link href="/news" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Global
                </Link>
                <Link href="/India" className="text-gray-700 hover:text-purple-600 transition-colors">
                    India
                </Link>
                <Link href="/bollywood" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Bollywood
                </Link>
                <Link href="/sport" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Sports
                </Link>
                <Link href="/Stocks" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Stocks
                </Link>
                <Link href="/crypto" className="text-gray-700 hover:text-purple-600 transition-colors">
                    crypto
                </Link>
            </motion.div>

            {/* Conditional Rendering for UserButton or Login Button */}
            <div>
                {isSignedIn ? (
                    // Show UserButton if the user is signed in
                    <UserButton afterSignOutUrl="/" aftreSignInUrl="/News" modal showName />
                ) : (
                    // Show Login Button if the user is not signed in
                    <Link href="/sign-in">
                        <Button variant="outline">Login</Button>
                    </Link>
                )}
            </div>
        </motion.nav>
    );
}