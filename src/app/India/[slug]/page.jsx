import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

async function getNews() {
    const apiKey = 'd4260d9d7705ca6fdf60a880775c3782';
    const url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=10&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching news:', error);
        return { articles: [] };
    }
}

const ArticlePage = async ({ params }) => {
    const { slug } = params;
    const newsData = await getNews();
    const articles = newsData.articles || [];

    // Find the article that matches the slug
    const article = articles.find(art =>
        encodeURIComponent(art.title) === slug
    );

    if (!article) {
        return (
            <div className="container mx-auto py-8 px-4 text-center">
                <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                <Button asChild>
                    <Link href="/India">Back to News</Link>
                </Button>
            </div>
        )
    }

    const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="outline" className="mb-6">
                    <Link href="/India">
                        ← Back to News
                    </Link>
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">{article.title}</CardTitle>
                        <CardDescription>
                            {formattedDate} • {article.source.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {article.image && (
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-auto rounded-lg"
                            />
                        )}
                        <p className="text-gray-700">{article.content || article.description}</p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                View Original Source
                            </a>
                        </Button>
                    </CardFooter>
                </Card>

                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">More News</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {articles
                            .filter(art => art.title !== article.title)
                            .slice(0, 4)
                            .map((art, index) => (
                                <Link key={index} href={`/India/${encodeURIComponent(art.title)}`}>
                                    <Card className="hover:bg-gray-50 cursor-pointer">
                                        <CardContent className="p-4">
                                            <h3 className="font-medium line-clamp-2">{art.title}</h3>
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                                                {art.source.name}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ArticlePage