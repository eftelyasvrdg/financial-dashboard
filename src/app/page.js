"use client"; // Mark this file as a client component

import { useState } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import HomeContent from "./HomeContent";
import ExpensesContent from "./ExpensesContent";

export default function Home() {
    const { t } = useTranslation("common");
    const [view, setView] = useState("home");

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
                    <h2 className="text-2xl font-bold text-blue-600">{t("title")}</h2>
                </div>
                <nav className="space-y-4">
                    <button
                        onClick={() => setView("home")}
                        className={`w-full text-left p-2 rounded ${
                            view === "home" ? "bg-blue-100 text-blue-600" : "text-gray-600"
                        }`}
                    >
                        {t("home")}
                    </button>
                    <button
                        onClick={() => setView("expenses")}
                        className={`w-full text-left p-2 rounded ${
                            view === "expenses" ? "bg-blue-100 text-blue-600" : "text-gray-600"
                        }`}
                    >
                        {t("expenses")}
                    </button>
                    <button
                        onClick={() => (window.location.href = "/ssr")}
                        className="w-full text-left p-2 rounded text-gray-600"
                    >
                        {t("ssr_demo")}
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {view === "home" && <HomeContent />}
                {view === "expenses" && <ExpensesContent />}
            </main>
        </div>
    );
}
