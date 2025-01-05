"use client"; // Mark this file as a client component

import { useEffect, useState } from "react";
import Image from "next/image";

export default function News() {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from your financial news API
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const apiKey = '3cc9aa9ad20b43d28e8fecbca5e3f99e';
                const response = await fetch(`https://newsapi.org/v2/everything?q=financial&apiKey=${apiKey}`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setNews(data.articles);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <aside className="w-1/4 bg-white p-4 shadow-md">
                <div className="mb-8 flex items-center">
                    <Image
                        src="/dashboard-icon.png" // Correct path from public folder
                        alt="Dashboard Icon"
                        width={50}
                        height={50}
                    />
                    <h2 className="text-2xl font-bold text-blue-600">Dashboard</h2>
                </div>
                <nav className="space-y-4">
                    <a
                        href="/"
                        className="w-full text-left p-2 rounded text-gray-600"
                    >
                        Home
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-700 mb-6">Financial News</h1>
                    <ul>
                        {news.map((article, index) => (
                            <li key={index} className="mb-4">
                                <h2 className="text-xl font-semibold">{article.title}</h2>
                                <p className="text-gray-700">{article.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
