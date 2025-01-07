// src/app/feedback/layout.js
"use client"; 


export default function FeedbackLayout({ children }) {

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <aside className="w-1/4 bg-white p-4 shadow-md">
                <div className="mb-8 flex items-center">
                    <img
                        src="/dashboard-icon.png" 
                        alt="Dashboard Icon"
                        width={50}
                        height={50}
                    />
                    <h2 className="text-2xl font-bold text-blue-600">Dashboard</h2>
                </div>
                <nav className="space-y-4">
                    <a href="/" className="w-full text-left p-2 rounded text-gray-600">
                        Home
                    </a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {children} {/* Render the children (Feedback page content) */}
            </main>
        </div>
    );
}
