"use client";

import { useState, useEffect } from "react";

export default function Feedback() {
    const [name, setName] = useState("");           
    const [feedback, setFeedback] = useState("");  
    const [response, setResponse] = useState("");   

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => setHydrated(true), []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!name || !feedback) {
            setResponse("Both fields are required!");
            return;
        }
    
        try {
            const res = await fetch("/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, feedback }),
            });
    
            if (res.ok) {
                const data = await res.json();
                setResponse(data.message);
            } else {
                const errorData = await res.json();
                setResponse(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error("Error submitting feedback:", error);
            setResponse("An error occurred while submitting your feedback.");
        }
    };

    if (!hydrated) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-700 mb-6">Send Feedback</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        placeholder="Your Feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Submit
                </button>
            </form>
            {response && (
                <p className="mt-4 text-gray-700" suppressHydrationWarning>
                    {response}
                </p>
            )}
        </div>
    );
}
