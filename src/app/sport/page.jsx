"use client";
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Sport() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    `https://gnews.io/api/v4/top-headlines?category=sports&lang=en&country=in&apikey=d4260d9d7705ca6fdf60a880775c3782`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (!data.articles) {
                    throw new Error('No sports articles found in response');
                }

                // Cache the articles for use in dynamic route
                localStorage.setItem('sports-articles', JSON.stringify(data.articles));
                setNews(data.articles || []);
            } catch (err) {
                setError(err.message);
                console.error('Sports fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-gray-50">
            <div className="text-center py-8">Loading sports news...</div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-50">
            <div className="text-center py-8 text-red-500">Error: {error}</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">
                    Sports News
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news?.length > 0 ? (
                        news.map((article, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col border border-blue-100">
                                <CardHeader>
                                    <CardTitle className="line-clamp-2 font-medium">{article.title || 'No title'}</CardTitle>
                                    <CardDescription className="line-clamp-2 text-sm">
                                        {article.description || 'No description available'}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    {article.image ? (
                                        <div className="relative h-48 w-full mb-4 overflow-hidden rounded-lg bg-blue-50">
                                            <img
                                                src={article.image}
                                                alt={article.title || 'Sports news image'}
                                                className="object-cover w-full h-full"
                                                onError={(e) => {
                                                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsbD0iI2VlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNHB4Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="h-48 w-full bg-blue-50 mb-4 flex items-center justify-center rounded-lg">
                                            <span className="text-blue-400">No image available</span>
                                        </div>
                                    )}
                                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                                        {article.content?.substring(0, 150) || 'No content available'}
                                    </p>
                                    <div className="mt-auto">
                                        <Link
                                            href={`/sport/${encodeURIComponent(article.title)}`}
                                            className="text-blue-600 hover:text-blue-800 transition-colors text-sm font-medium"
                                        >
                                            Read full story →
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center col-span-full py-8">
                            No sports articles found
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}