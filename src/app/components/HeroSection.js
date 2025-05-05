



"use client"

import { motion } from "framer-motion"
import { SignInButton, useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CustomA from "../components/CustomA.jsx"

const features = [
    {
        title: "Global News",
        description: "Stay updated with the latest news from around the world",
    },
    {
        title: "Indian News",
        description: "Comprehensive coverage of Indian news and current affairs",
    },
    {
        title: "Stock Market",
        description: "Real-time stock prices and market analysis",
    },
]

export default function HeroSection() {
    const { user, isLoaded } = useUser()

    return (
        <div className="relative min-h-screen overflow-hidden bg-black">
            {/* Background subtle circles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(4)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gray-800/10"
                        style={{
                            width: `${Math.random() * 300 + 100}px`,
                            height: `${Math.random() * 300 + 100}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.05, 0.08, 0.05],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center px-4 py-20 mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center w-full"
                >
                    <h1 className="mt-8 text-5xl font-bold tracking-tight text-white sm:text-6xl">
                        {isLoaded && user ? (
                            <>
                                Welcome <span className="text-red-700">{user.fullName} 👋</span> To{" "}
                                <span className="text-red-700">NewsNow</span>
                            </>
                        ) : (
                            <>
                                Welcome to <span className="text-red-700">NewsNow</span>
                            </>
                        )}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        Your one-stop destination for global news, Indian updates, and real-time stock market data.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        {isLoaded && user ? (
                            <>
                                <Link href="/news">
                                    <Button size="lg" className="bg-red-700 hover:bg-red-600 cursor-pointer">
                                        Global News
                                    </Button>
                                </Link>
                                <Link href="/India">
                                    <Button variant="outline" size="lg" className="text-black cursor-pointer">
                                        Indian News
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <SignInButton mode="modal">
                                <Button size="lg" className="bg-red-700 hover:bg-red-600">
                                    Get Started
                                </Button>
                            </SignInButton>
                        )}
                    </div>
                </motion.div>

                {/* Vertical list container */}
                <motion.div
                    className="mt-20 w-[80%] space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{
                                boxShadow: "0 0 15px rgba(156, 163, 175, 0.3)",
                            }}
                            className="p-8 rounded-xl border border-gray-600 backdrop-blur-xl bg-black/50 transition-all duration-300"
                        >
                            <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                            <p className="mt-3 text-gray-300">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Only show CustomA when user is logged in */}
            {isLoaded && user && <CustomA />}
        </div>
    )
}