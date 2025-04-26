import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

async function getNews() {
    const apiKey = 'd4260d9d7705ca6fdf60a880775c3782';
    const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=10&apikey=${apiKey}`;

    try {
        const response = await fetch(url, { next: { revalidate: 3600 } });
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching news:', error);
        return { articles: [] };
    }
}

const NewsCardSkeleton = () => {
    return (
        <Card className="w-full max-w-2xl">
            <Skeleton className="h-48 w-full rounded-t-lg" />
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-full mt-2" />
                <Skeleton className="h-4 w-5/6 mt-2" />
                <Skeleton className="h-4 w-4/6 mt-2" />
            </CardContent>
            <CardFooter>
                <Skeleton className="h-10 w-24" />
            </CardFooter>
        </Card>
    );
};

const NewsCard = ({ article }) => {
    const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <Card className="w-full max-w-2xl hover:shadow-lg transition-shadow">
            {article.image && (
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                    loading="lazy"
                />
            )}
            <CardHeader>
                <CardTitle className="text-xl">{article.title}</CardTitle>
                <CardDescription>
                    {formattedDate} • {article.source.name}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700">{article.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <Button asChild variant="outline">
                    <Link href={`/India/${encodeURIComponent(article.title)}`}>Read More</Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

const page = async () => {
    const newsData = await getNews();
    const articles = newsData.articles || [];

    return (
        <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">India News Headlines</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    {articles.length > 0 ? (
                        articles.map((article, index) => (
                            <NewsCard key={index} article={article} />
                        ))
                    ) : (
                        <>
                            <NewsCardSkeleton />
                            <NewsCardSkeleton />
                            <NewsCardSkeleton />
                        </>
                    )}
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-semibold">Trending Now</h2>
                    {articles.length > 0 ? (
                        articles.slice(0, 4).map((article, index) => (
                            <Link key={index} href={`/India/${encodeURIComponent(article.title)}`}>
                                <Card className="hover:bg-gray-50 cursor-pointer overflow-hidden">
                                    <div className="flex gap-4">
                                        {article.image && (
                                            <img
                                                src={article.image}
                                                alt={article.title}
                                                className="w-24 h-24 object-cover flex-shrink-0"
                                                loading="lazy"
                                            />
                                        )}
                                        <CardContent className="p-4 flex flex-col justify-center">
                                            <h3 className="font-medium line-clamp-2">{article.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                                {article.source.name}
                                            </p>
                                        </CardContent>
                                    </div>
                                </Card>
                            </Link>
                        ))
                    ) : (
                        <>
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-24 w-full" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default page