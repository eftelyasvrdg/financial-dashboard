import Image from "next/image";

export default async function SSRPage() {
    const API_URL = "https://open.er-api.com/v6/latest/USD";

    let rates = {};
    let base = "USD";

    try {
        const response = await fetch(API_URL, { cache: "no-store" });
        const data = await response.json();

        if (data && data.rates) {
            rates = data.rates;
            base = data.base_code || "USD";
        } else {
            throw new Error("Invalid API response");
        }
    } catch (error) {
        console.error("Error fetching exchange rate data:", error.message);
    }

    if (!rates || Object.keys(rates).length === 0) {
        return (
            <div className="flex bg-gray-100 min-h-screen">
                {/* Sidebar */}
                <aside className="w-1/4 bg-white p-4 shadow-md">
                    <div className="mb-8 flex items-center">
                        <Image
                            src="/dashboard-icon.png" 
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
                        <h1 className="text-2xl font-bold text-gray-700 mb-6">SSR Demo</h1>
                        <p>No exchange rate data available. Please try again later.</p>
                        {/* Back to Home Button */}
                        <a
                            href="/"
                            className="mt-4 w-full text-left p-2 rounded bg-blue-100 text-blue-600"
                        >
                            Back to Home
                        </a>
                    </div>
                </main>
            </div>
        );
    }

    // SSR Content Rendering (Exchange Rates)
    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <aside className="w-1/4 bg-white p-4 shadow-md">
                <div className="mb-8 flex items-center">
                    <Image
                        src="/dashboard-icon.png" 
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
                    <h1 className="text-2xl font-bold text-gray-700 mb-6">
                        Live Exchange Rates (Base: {base})
                    </h1>
                    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(rates).map(([currency, rate]) => (
                            <li key={currency} className="bg-blue-50 p-4 rounded-lg shadow-md text-center">
                                <h3 className="font-semibold text-gray-700">{currency}</h3>
                                <p className="text-lg text-green-600 font-bold">{rate}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </main>
        </div>
    );
}
