'use client';

import React from 'react';
import Image from 'next/image';
import RehanImg from '../../assits/noprofile.png';
import TauhidImg from '../../assits/pushpa.png';
import AdnanImg from '../../assits/beti.png';
import BrandLogo from '../../assits/adnan.png';
import { FaFacebook, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, TrendingUp, Newspaper, Smartphone } from 'lucide-react';

const Team = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <>
            <div id='about' className='w-full py-16 bg-gradient-to-br from-gray-50 to-gray-100'>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={staggerContainer}
                    viewport={{ once: true }}
                    className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'
                >
                    <motion.div variants={fadeIn} className='text-center mb-16'>
                        <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>About NewsNow</h2>
                        <div className='w-24 h-1 bg-green-500 mx-auto mb-6'></div>
                        <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                            Your one-stop destination for global news, Indian updates, and real-time stock market data.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'
                    >
                        <motion.div variants={fadeIn}>
                            <Card className='h-full hover:shadow-lg transition-shadow duration-300'>
                                <CardHeader className='pb-2'>
                                    <div className='bg-green-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4'>
                                        <Globe className='text-green-600' size={24} />
                                    </div>
                                    <CardTitle className='text-xl'>Global Coverage</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className='text-gray-600'>
                                        Comprehensive news from around the world with multiple API sources for diverse perspectives.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeIn}>
                            <Card className='h-full hover:shadow-lg transition-shadow duration-300'>
                                <CardHeader className='pb-2'>
                                    <div className='bg-blue-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4'>
                                        <TrendingUp className='text-blue-600' size={24} />
                                    </div>
                                    <CardTitle className='text-xl'>Real-time Markets</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className='text-gray-600'>
                                        Live stock market data and financial news to keep you updated on market movements.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeIn}>
                            <Card className='h-full hover:shadow-lg transition-shadow duration-300'>
                                <CardHeader className='pb-2'>
                                    <div className='bg-purple-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4'>
                                        <Newspaper className='text-purple-600' size={24} />
                                    </div>
                                    <CardTitle className='text-xl'>Indian Focus</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className='text-gray-600'>
                                        Dedicated sections for Indian news, sports, and entertainment from local sources.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeIn}>
                            <Card className='h-full hover:shadow-lg transition-shadow duration-300'>
                                <CardHeader className='pb-2'>
                                    <div className='bg-orange-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4'>
                                        <Smartphone className='text-orange-600' size={24} />
                                    </div>
                                    <CardTitle className='text-xl'>Modern Tech Stack</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className='text-gray-600'>
                                        Built with Next.js, Tailwind, ShadCN, and Clerk for a seamless user experience.
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>

                    <motion.div variants={fadeIn} className='bg-white rounded-xl shadow-md p-8'>
                        <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Technical Details</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                                <h4 className='font-medium text-gray-900 mb-2'>APIs Used</h4>
                                <ul className='space-y-2 text-gray-600'>
                                    <li className='flex items-center'>
                                        <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
                                        NewsAPI.org - Global news coverage
                                    </li>
                                    <li className='flex items-center'>
                                        <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
                                        api.mediastack.com - Alternative news source
                                    </li>
                                    <li className='flex items-center'>
                                        <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
                                        alphavantage.co - Stock market data
                                    </li>
                                    <li className='flex items-center'>
                                        <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
                                        gnews.io - Sports news
                                    </li>
                                    <li className='flex items-center'>
                                        <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
                                        gnews.io - Entertainment news
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className='font-medium text-gray-900 mb-2'>Key Features</h4>
                                <ul className='space-y-2 text-gray-600'>
                                    <li className='flex items-center'>
                                        <span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
                                        Server actions for data fetching
                                    </li>
                                    <li className='flex items-center'>
                                        <span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
                                        WebSocket for real-time updates
                                    </li>
                                    <li className='flex items-center'>
                                        <span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
                                        Modern UI with Tailwind and ShadCN
                                    </li>
                                    <li className='flex items-center'>
                                        <span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
                                        Authentication via Clerk
                                    </li>
                                    <li className='flex items-center'>
                                        <span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
                                        Responsive design for all devices
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <div className='Team w-full p-10 bg-gray-100'>
                <div className='Casestudy p-4'>
                    <h1 className='text-4xl font-bold text-left pt-2 mb-6 text-gray-900'>Our Team</h1>
                    <div className='w-full h-1 bg-green-500 mb-4'></div>
                    <p className='text-xl font-sans text-left text-gray-900 leading-7'>
                        We are a passionate summer project team building a powerful and user-friendly portal app designed to streamline digital services. Our team brings together skilled developers, detail-oriented testers, strategic project managers, and creative designers, all working collaboratively to bring this vision to life.
                    </p>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={staggerContainer}
                    viewport={{ once: true }}
                    className='team__image-div w-full mx-auto mt-[5rem] mb-[5rem] p-2 flex gap-y-16 justify-center items-center flex-wrap gap-[2rem]'
                >
                    {[
                        { img: BrandLogo, name: 'Adnan', role: 'Developer' },
                        { img: TauhidImg, name: 'Kaif', role: 'Tester' },
                        { img: AdnanImg, name: 'Ghazi', role: 'Management' },
                        { img: RehanImg, name: 'Manjiri', role: 'Designer' }
                    ].map((member, index) => (
                        <motion.div
                            key={index}
                            variants={fadeIn}
                            whileHover={{ y: -10 }}
                            className='flex-1 border h-[400px] min-w-[250px] max-w-[250px] rounded-2xl bg-gray-50 shadow-md hover:shadow-xl transition-all duration-300'
                        >
                            <div className='h-[250px] overflow-hidden rounded-xl mt-[-15px]'>
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    width={250}
                                    height={250}
                                    className='h-full grayscale hover:grayscale-0 transition-all duration-500 object-cover'
                                />
                            </div>
                            <div className='flex-1 p-4'>
                                <h2 className='text-gray-900 text-2xl font-medium mb-1'>{member.name}</h2>
                                <p className='text-gray-500 tracking-widest text-sm'>{member.role}</p>
                                <div className='w-full flex gap-5 h-full mt-8 text-gray-400'>
                                    <a href="#" className='hover:text-gray-600 transition-colors'><FaLinkedinIn size={25} /></a>
                                    <a href="#" className='hover:text-gray-600 transition-colors'><FaFacebook size={25} /></a>
                                    <a href="#" className='hover:text-gray-600 transition-colors'><FaTwitter size={25} /></a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    )
}

export default Team;