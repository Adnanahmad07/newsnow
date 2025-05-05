import React from 'react';
import IndiaImg from '../../assits/India.png';
import GlobalImg from '../../assits/global.png';
import BollywoodImg from '../../assits/bollywood.png';
import SportImg from '../../assits/sports.png';
import StocksImg from '../../assits/stocks.png';
import CryptoImg from '../../assits/crypto.png';
import AboutUsImg from '../../assits/about.png';

const CustomB = () => {
    const categories = [
        {
            tag: 'India',
            title: 'India News',
            color: 'bg-orange-500',
            image: IndiaImg,
            description: 'Stay updated with the latest happenings across India. From politics to culture, get comprehensive coverage of all major events and developments in the country.'
        },
        {
            tag: 'Global',
            title: 'Global Affairs',
            color: 'bg-blue-500',
            image: GlobalImg,
            description: 'Explore world news and international relations. Get insights into global politics, economics, and significant events shaping our world today.'
        },
        {
            tag: 'Bollywood',
            title: 'Bollywood Buzz',
            color: 'bg-pink-500',
            image: BollywoodImg,
            description: 'Your daily dose of entertainment news from Bollywood. Movie releases, celebrity gossip, and behind-the-scenes action from the Indian film industry.'
        },
        {
            tag: 'Sport',
            title: 'Sports Updates',
            color: 'bg-green-500',
            image: SportImg,
            description: 'Comprehensive sports coverage including cricket, football, tennis and more. Live scores, match analysis, player stats and upcoming tournaments.'
        },
        {
            tag: 'Stocks',
            title: 'Stock Market',
            color: 'bg-purple-500',
            image: StocksImg,
            description: 'Track market trends and investment opportunities. Get expert analysis on stocks, mutual funds, and the latest financial news to make informed decisions.'
        },
        {
            tag: 'Crypto',
            title: 'Crypto World',
            color: 'bg-yellow-500',
            image: CryptoImg,
            description: 'Stay ahead in the cryptocurrency market. Bitcoin, Ethereum and altcoin updates, blockchain technology news, and investment strategies.'
        },
        {
            tag: 'About Us',
            title: 'Our Story',
            color: 'bg-red-500',
            image: AboutUsImg,
            description: 'Learn about our mission, vision and the team behind this platform. Discover how we deliver reliable and timely information to our audience.'
        }
    ];

    return (
        <div className='w-full py-12 '>
            <div className="bg-black py-10 px-4 text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-400 mb-3">
                    WHY CHOOSE US
                </h1>
                <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full"></div>
            </div>

            {categories.map((category, index) => (
                <div
                    key={index}
                    className='w-full border-b border-black hover:bg-gray-200 hover:border-white duration-200 relative py-3 group'
                >
                    <span className={`${category.color} px-4 text-[12px] py-[3px] ml-3 rounded-xl text-white`}>
                        {category.tag}
                    </span>
                    <h2 className='text-3xl font-medium tracking-widest leading-9 p-3 xl:pl-12 md:pl-8'>
                        {category.title}
                    </h2>
                    <p className='text-sm font-normal leading-5 max-w-96 xl:min-w-[700px] xl:pl-12 md:pl-8 p-3'>
                        {category.description}
                    </p>

                    {/* Mobile Image */}


                    {/* Desktop Image */}

                </div>
            ))}
        </div>
    );
};

export default CustomB;