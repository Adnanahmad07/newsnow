import React from 'react';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

const ArticlePage = async ({ params }) => {
    const { slug } = params;
    const newsData = await getNews();
    const articles = newsData.articles || [];

    // Decode the URL-encoded title
    const decodedSlug = decodeURIComponent(slug);

    // Find the article that matches the slug (title)
    const article = articles.find(art => art.title === decodedSlug);

    if (!article) {
        return notFound();
    }

    const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <Button asChild variant="outline" className="mb-6">
                    <Link href="/India">← Back to News</Link>
                </Button>

                <Card className="w-full">
                    {article.image && (
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-96 object-cover rounded-t-lg"
                            loading="lazy"
                        />
                    )}
                    <CardHeader>
                        <CardTitle className="text-2xl md:text-3xl">{article.title}</CardTitle>
                        <CardDescription>
                            {formattedDate} • {article.source.name}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-lg text-gray-700">{article.description}</p>
                        {article.content && (
                            <p className="text-gray-700">{article.content}</p>
                        )}
                        <div className="pt-4">
                            <Button asChild>
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    Read Full Article on {article.source.name}
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ArticlePage;