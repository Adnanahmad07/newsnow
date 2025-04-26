'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function News() {
    const [news, setNews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef(null);

    const fetchNews = async (page = 1) => {
        const apiKey = 'd4260d9d7705ca6fdf60a880775c3782'; // GNews API key
        const url = `https://gnews.io/api/v4/top-headlines?country=us&apikey=${apiKey}&page=${page}&max=10`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.articles && data.articles.length > 0) {
                setNews((prevNews) => (page === 1 ? data.articles : [...prevNews, ...data.articles]));
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchNews(page);
    }, [page]);

    const lastNewsElementRef = useCallback(
        (node) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    const filteredNews = news.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Top Headlines</h2>

            <Input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {isLoading && page === 1 ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Card key={index} className="animate-pulse">
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-full" />
                            </CardHeader>
                            <CardContent>
                                <Skeleton className="h-40 w-full" />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    filteredNews.map((article, index) => (
                        <motion.div
                            key={index}
                            ref={filteredNews.length === index + 1 ? lastNewsElementRef : null}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link href={`/news/${encodeURIComponent(article.title)}`} passHref>
                                <Card className="h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
                                    {article.image && (
                                        <img
                                            src={article.image}
                                            alt={article.title}
                                            className="w-full h-48 object-cover rounded-t-lg"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                            }}
                                        />
                                    )}
                                    <CardHeader>
                                        <CardTitle className="text-lg">{article.title}</CardTitle>
                                        <CardDescription>{article.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-sm text-gray-600">{article.content}</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))
                )}
            </div>

            {isLoading && <p className="text-center mt-4">Loading more news...</p>}
            {!hasMore && <p className="text-center mt-4">No more articles to load.</p>}
        </div>
    );
}