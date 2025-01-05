// src/app/news.js

export async function getStaticProps() {
    // Fetch data from your API endpoint (replace with a real API)
    const response = await fetch("https://api.example.com/financial-news");
    const news = await response.json();

    // Return the data and set revalidation interval to 60 seconds
    return { 
        props: { news },
        revalidate: 60 // Revalidate every 60 seconds
    };
}

export default function News({ news }) {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Financial News</h1>
                <ul>
                    {news.map((article) => (
                        <li key={article.id} className="mb-4">
                            <h2 className="text-xl font-semibold">{article.title}</h2>
                            <p className="text-gray-700">{article.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
