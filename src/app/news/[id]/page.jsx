'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default function NewsArticle() {
    const [article, setArticle] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchArticleAndRelated = async () => {
            const apiKey = 'd4260d9d7705ca6fdf60a880775c3782'; // GNews API key
            const url = `https://gnews.io/api/v4/top-headlines?country=us&apikey=${apiKey}&max=10`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                // Find the current article
                const foundArticle = data.articles.find(
                    (article) => encodeURIComponent(article.title) === id
                );
                setArticle(foundArticle);

                // Set related articles (excluding the current one)
                setRelatedArticles(data.articles.filter(
                    (article) => encodeURIComponent(article.title) !== id
                ).slice(0, 5));
            } catch (error) {
                console.error('Error fetching article:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticleAndRelated();
    }, [id]);

    if (isLoading) {
        return <p className="text-center mt-4">Loading article...</p>;
    }

    if (!article) {
        return <p className="text-center mt-4">Article not found.</p>;
    }

    return (
        <div className="p-4 max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
            {/* Main Article Content */}
            <div className="lg:w-2/3">
                {/* Article Image */}
                {article.image && (
                    <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-96 object-cover rounded-lg mb-6"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                        }}
                    />
                )}

                {/* Article Title */}
                <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

                {/* Article Description */}
                <p className="text-lg text-gray-700 mb-6">{article.description}</p>

                {/* Article Content */}
                <p className="text-gray-600">{article.content}</p>

                {/* Article Source and Date */}
                <div className="mt-4 text-sm text-gray-500">
                    <p>Source: {article.source?.name}</p>
                    <p>Published: {new Date(article.publishedAt).toLocaleDateString()}</p>
                    {article.url && (
                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            Read full article
                        </a>
                    )}
                </div>
            </div>

            {/* Sidebar with Related Articles */}
            <div className="lg:w-1/3">
                <h2 className="text-xl font-bold mb-4">More Headlines</h2>
                <div className="space-y-4">
                    {relatedArticles.map((relatedArticle, index) => (
                        <Link
                            key={index}
                            href={`/news/${encodeURIComponent(relatedArticle.title)}`}
                            passHref
                        >
                            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                                {relatedArticle.image && (
                                    <img
                                        src={relatedArticle.image}
                                        alt={relatedArticle.title}
                                        className="w-full h-32 object-cover rounded-t-lg"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/300x150?text=No+Image';
                                        }}
                                    />
                                )}
                                <CardHeader>
                                    <CardTitle className="text-md">{relatedArticle.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {relatedArticle.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}