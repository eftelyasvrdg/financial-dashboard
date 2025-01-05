"use client";

import { useState } from "react";
import { Bar } from "react-chartjs-2";
import Image from "next/image"; // Import the Image component
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// Dynamically import SSRPage with SSR enabled
const SSRPage = dynamic(() => import("./ssr"), { ssr: true });

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Home() {
    const { t } = useTranslation("common");
    const [view, setView] = useState("home");
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

    const [newExpenseName, setNewExpenseName] = useState("");
    const [newExpenseAmount, setNewExpenseAmount] = useState("");

    const handleAddExpense = () => {
        const expenseAmount = parseFloat(newExpenseAmount);
        const expenseName = newExpenseName.trim() || t("expense_name");
        if (isNaN(expenseAmount)) return;

        setFinancialData((prev) => ({
            ...prev,
            expenses: prev.expenses + expenseAmount,
            savings: prev.income - (prev.expenses + expenseAmount),
            expenseHistory: [
                ...prev.expenseHistory,
                { name: expenseName, amount: expenseAmount },
            ],
        }));
        setNewExpenseName("");
        setNewExpenseAmount("");
    };

    const revenueData = {
        labels: financialData.expenseHistory.map((expense) => expense.name),
        datasets: [
            {
                label: t("expenses_breakdown"),
                data: financialData.expenseHistory.map((expense) => expense.amount),
                backgroundColor: "rgba(255, 99, 132, 0.7)",
            },
        ],
    };

    const revenueOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: t("expenses_breakdown"),
            },
        },
    };

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <aside className="w-1/4 bg-white p-4 shadow-md">
                <div className="mb-8 flex items-center">
                    {/* Add the optimized image */}
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
                        Home
                    </button>
                    <button
                        onClick={() => setView("expenses")}
                        className={`w-full text-left p-2 rounded ${
                            view === "expenses" ? "bg-blue-100 text-blue-600" : "text-gray-600"
                        }`}
                    >
                        Expenses
                    </button>
                    <button
                        onClick={() => setView("ssr")}
                        className={`w-full text-left p-2 rounded ${
                            view === "ssr" ? "bg-blue-100 text-blue-600" : "text-gray-600"
                        }`}
                    >
                        SSR Demo
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                {view === "home" && (
                    <div>
                        <h1 className="text-2xl font-bold text-gray-700 mb-6">{t("title")}</h1>

                        {/* Top Row: Collected, Total Expenses, Savings */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold text-gray-600">{t("collected")}</h2>
                                <p className="text-3xl font-bold text-green-600 mt-2">
                                    ${financialData.income}
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold text-gray-600">{t("total_expenses")}</h2>
                                <p className="text-3xl font-bold text-red-600 mt-2">
                                    ${financialData.expenses}
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold text-gray-600">{t("savings")}</h2>
                                <p className="text-3xl font-bold text-blue-600 mt-2">
                                    ${financialData.savings}
                                </p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                            <h2 className="text-lg font-semibold text-gray-600 mb-4">{t("expenses_breakdown")}</h2>
                            <Bar
                                data={revenueData}
                                options={revenueOptions}
                                className="w-full h-72"
                            />
                        </div>
                    </div>
                )}

                {view === "expenses" && (
                    <div>
                        <h1 className="text-2xl font-bold text-gray-700 mb-6">{t("add_expense")}</h1>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-gray-600">{t("add_expense")}</h2>
                            <div className="flex mt-4 space-x-4">
                                <input
                                    type="text"
                                    placeholder={t("expense_name")}
                                    className="border p-2 rounded w-full"
                                    value={newExpenseName}
                                    onChange={(e) => setNewExpenseName(e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder={t("expense_amount")}
                                    className="border p-2 rounded w-full"
                                    value={newExpenseAmount}
                                    onChange={(e) => setNewExpenseAmount(e.target.value)}
                                />
                                <button
                                    onClick={handleAddExpense}
                                    className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                                >
                                    {t("add_button")}
                                </button>
                            </div>
                        </div>
                        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold text-gray-600">{t("expenses_breakdown")}</h2>
                            <ul className="mt-4 space-y-2">
                                {financialData.expenseHistory.map((expense, index) => (
                                    <li key={index} className="flex justify-between border-b pb-2">
                                        <span className="text-gray-700">{expense.name}</span>
                                        <span className="text-gray-900 font-semibold">${expense.amount}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                {view === "ssr" && <SSRPage />}
            </main>
        </div>
    );
}
