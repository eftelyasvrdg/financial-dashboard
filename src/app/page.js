"use client";

import { useState } from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import HomeContent from "./HomeContent";
import ExpensesContent from "./ExpensesContent";

export default function Home() {
    const { t } = useTranslation("common");

    const [financialData, setFinancialData] = useState({
        income: 5000,
        expenses: 2500,
        savings: 2500,
        expenseHistory: [
            { name: "Rent", amount: 500 },
            { name: "Groceries", amount: 200 },
            { name: "Utilities", amount: 100 },
        ],
    });

    const [view, setView] = useState("home");

    const addExpense = (name, amount) => {
        if (!name || amount <= 0 || isNaN(amount)) {
            console.error("Invalid expense:", { name, amount });
            return;
        }

        const updatedExpenseHistory = [...financialData.expenseHistory, { name, amount }];

        const updatedTotalExpenses = financialData.expenses + amount;

        const updatedSavings = financialData.income - updatedTotalExpenses;

        setFinancialData((prevState) => ({
            ...prevState,
            expenseHistory: updatedExpenseHistory,
            expenses: updatedTotalExpenses,
            savings: updatedSavings >= 0 ? updatedSavings : 0,
        }));
    
        console.log("Updated Expense History:", updatedExpenseHistory);
        console.log("Updated Total Expenses:", updatedTotalExpenses);
        console.log("Updated Savings:", updatedSavings);
    };
    
    return (
        <div className="flex bg-gray-100 min-h-screen">
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
                    <button
                        onClick={() => (window.location.href = "/news")}
                        className="w-full text-left p-2 rounded text-gray-600"
                    >
                        {t("financial_news")}
                    </button>
                    <button
                        onClick={() => (window.location.href = "/feedback")}
                        className="w-full text-left p-2 rounded text-gray-600"
                    >
                        {t("send_feedback")}
                    </button>
                </nav>
            </aside>

            <main className="flex-1 p-6">
                {view === "home" && <HomeContent financialData={financialData} />}
                {view === "expenses" && (
                    <ExpensesContent financialData={financialData} addExpense={addExpense} />
                )}
            </main>
        </div>
    );
}
