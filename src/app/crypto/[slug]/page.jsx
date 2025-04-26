"use client";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

export default function CryptoArticlePage() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedArticles, setRelatedArticles] = useState([]);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                // First try to get from localStorage
                const cachedArticles = JSON.parse(localStorage.getItem('crypto-articles') || '[]');
                const cachedArticle = cachedArticles.find(a =>
                    encodeURIComponent(a.title) === slug
                );

                if (cachedArticle) {
                    setArticle(cachedArticle);
                    setLoading(false);
                    return;
                }

                // If not in cache, fetch fresh data
                const response = await fetch(
                    `https://gnews.io/api/v4/top-headlines?category=business&q=crypto&apikey=d4260d9d7705ca6fdf60a880775c3782&max=20`
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                if (!data.articles) {
                    throw new Error('No articles found in response');
                }

                // Cache the articles
                localStorage.setItem('crypto-articles', JSON.stringify(data.articles));

                const foundArticle = data.articles.find(a =>
                    encodeURIComponent(a.title) === slug
                );

                if (!foundArticle) {
                    throw new Error('Crypto article not found');
                }

                setArticle(foundArticle);
                // Set related articles (excluding current one)
                setRelatedArticles(data.articles.filter(a =>
                    encodeURIComponent(a.title) !== slug
                ).slice(0, 3));
            } catch (err) {
                setError(err.message);
                console.error('Fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-8">Loading crypto article...</div>
            </div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center py-8 text-red-500">Error: {error}</div>
                <div className="text-center">
                    <Link href="/crypto">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Crypto News
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href="/crypto">
                        <Button variant="outline">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Crypto News
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <article className="lg:w-2/3 bg-white rounded-lg shadow-md overflow-hidden border border-green-100">
                        {article.image ? (
                            <div className="relative h-96 w-full overflow-hidden bg-green-50">
                                <img
                                    src={article.image}
                                    alt={article.title || 'Crypto news image'}
                                    className="object-cover w-full h-full"
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsbD0iI2VlZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNHB4Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="h-48 w-full bg-green-50 flex items-center justify-center">
                                <span className="text-green-400">No image available</span>
                            </div>
                        )}

                        <div className="p-6">
                            <h1 className="text-3xl font-bold mb-4">{article.title || 'No title'}</h1>

                            <div className="flex items-center text-sm text-gray-500 mb-6">
                                <span>
                                    {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : 'Unknown date'}
                                </span>
                                <span className="mx-2">•</span>
                                <span>{article.source?.name || 'Unknown source'}</span>
                            </div>

                            <p className="text-lg mb-6">{article.description}</p>

                            <div className="prose max-w-none">
                                <p>{article.content}</p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                {article.url && (
                                    <Link href={article.url} target="_blank" rel="noopener noreferrer">
                                        <Button>
                                            Read original article
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </article>

                    {/* Related Articles Sidebar */}
                    <div className="lg:w-1/3">
                        <h2 className="text-xl font-bold mb-4">Related Crypto News</h2>
                        <div className="space-y-4">
                            {relatedArticles.map((related, index) => (
                                <Link
                                    key={index}
                                    href={`/crypto/${encodeURIComponent(related.title)}`}
                                    className="block"
                                >
                                    <div className="p-4 border border-green-100 rounded-lg hover:shadow-md transition-shadow">
                                        <h3 className="font-medium line-clamp-2">{related.title}</h3>
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                                            {related.description}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}