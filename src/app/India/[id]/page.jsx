'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function NewsArticle() {
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams(); // Get the dynamic route parameter (id)

    useEffect(() => {
        const fetchArticle = async () => {
            const apiKey = '4b84b8a2fbcfac1b8139b0b74eaf3d2e';
            const url = `http://api.mediastack.com/v1/news?access_key=${apiKey}&countries=in&limit=100`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                const foundArticle = data.data.find((article) => encodeURIComponent(article.title) === id);
                setArticle(foundArticle);
            } catch (error) {
                console.error('Error fetching article:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (isLoading) {
        return <p className="text-center mt-4">Loading article...</p>;
    }

    if (!article) {
        return <p className="text-center mt-4">Article not found.</p>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            {/* Article Image */}
            {article.image && (
                <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-96 object-cover rounded-lg mb-6"
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
                <p>Source: {article.source}</p>
                <p>Published: {new Date(article.published_at).toLocaleDateString()}</p>
            </div>
        </div>
    );
}