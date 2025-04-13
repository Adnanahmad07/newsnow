'use client';

import { motion } from 'framer-motion';
import { SignInButton, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const features = [
    {
        title: "Global News",
        description: "Stay updated with the latest news from around the world"
    },
    {
        title: "Indian News",
        description: "Comprehensive coverage of Indian news and current affairs"
    },
    {
        title: "Stock Market",
        description: "Real-time stock prices and market analysis"
    }
];

export default function HeroSection() {
    const { user, isLoaded } = useUser();

    return (
        <div className="relative z-10 px-4 py-20 mx-auto max-w-7xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
            >
                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                    {isLoaded && user ? (
                        <>Welcome <span className="text-indigo-500">{user.firstName}</span> to <span className="text-indigo-500">NewsNow</span></>
                    ) : (
                        <>Welcome to <span className="text-indigo-500">NewsNow</span></>
                    )}
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-300">
                    Your one-stop destination for global news, Indian updates, and real-time stock market data.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    {isLoaded && user ? (
                        <>
                            <Link href="/news">
                                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500">
                                    Global News
                                </Button>
                            </Link>
                            <Link href="/India">
                                <Button variant="outline" size="lg" className="text-black border-white hover:bg-gray-200">
                                    Indian News
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <SignInButton mode="modal">
                            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500">
                                Get Started
                            </Button>
                        </SignInButton>
                    )}
                </div>
            </motion.div>

            <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                        className="relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                    >
                        <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                        <p className="mt-2 text-gray-300">{feature.description}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
} 