"use client";

import { Bar } from "react-chartjs-2";
import { useState } from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function HomeContent({ financialData }) {
    const { t } = useTranslation("common");

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
            legend: { position: "top" },
            title: { display: true, text: t("expenses_breakdown") },
        },
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-700 mb-6">{t("title")}</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-600">{t("collected")}</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">${financialData.income}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-600">{t("total_expenses")}</h2>
                    <p className="text-3xl font-bold text-red-600 mt-2">${financialData.expenses}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-600">{t("savings")}</h2>
                    <p className="text-3xl font-bold text-blue-600 mt-2">${financialData.savings}</p>
                </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mt-8">
                <h2 className="text-lg font-semibold text-gray-600 mb-4">{t("expenses_breakdown")}</h2>
                <Bar data={revenueData} options={revenueOptions} className="w-full h-72" />
            </div>
        </div>
    );
}
