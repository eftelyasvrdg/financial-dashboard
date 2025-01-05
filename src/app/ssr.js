export async function getServerSideProps() {
    try {
        const response = await fetch("https://open.er-api.com/v6/latest/USD");

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!data || !data.rates || typeof data.rates !== "object") {
            throw new Error("Invalid API response structure");
        }

        console.log("API Response:", data);

        return {
            props: {
                rates: data.rates, 
                base: data.base_code || "USD", 
            },
        };
    } catch (error) {
        console.error("Error fetching exchange rate data:", error);

        return {
            props: {
                rates: {}, 
                base: "USD",
                error: error.message || "Unknown error occurred", 
            },
        };
    }
}

export default function SSRPage({ rates, base, error }) {
    if (error) {
        console.error("SSR Error:", error); 
    }

    if (!rates || Object.keys(rates).length === 0) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-gray-700 mb-6">Server-Side Rendering (SSR)</h1>
                    <h2 className="text-lg font-semibold text-gray-600 mb-4">
                        No exchange rate data available. Please try again later.
                    </h2>
                    {error && <p className="text-red-500">Error: {error}</p>}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-700 mb-6">Server-Side Rendering (SSR)</h1>
                <h2 className="text-lg font-semibold text-gray-600 mb-4">
                    Live Exchange Rates (Base: {base})
                </h2>
                <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(rates).map(([currency, rate]) => (
                        <li
                            key={currency}
                            className="bg-blue-50 p-4 rounded-lg shadow-md text-center"
                        >
                            <h3 className="font-semibold text-gray-700">{currency}</h3>
                            <p className="text-lg text-green-600 font-bold">{rate}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
