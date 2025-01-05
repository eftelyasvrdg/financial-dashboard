"use client";

import { useState } from "react";
import useTranslation from "next-translate/useTranslation";

export default function ExpensesContent() {
    const { t } = useTranslation("common");

    // Include pre-existing expenses
    const [expenses, setExpenses] = useState([
        { name: "Rent", amount: 500 },
        { name: "Groceries", amount: 200 },
        { name: "Utilities", amount: 100 },
    ]);
    const [newExpenseName, setNewExpenseName] = useState("");
    const [newExpenseAmount, setNewExpenseAmount] = useState("");

    const handleAddExpense = () => {
        const expenseAmount = parseFloat(newExpenseAmount);
        const expenseName = newExpenseName.trim() || t("expense_name");
        if (isNaN(expenseAmount)) return;

        setExpenses([...expenses, { name: expenseName, amount: expenseAmount }]);
        setNewExpenseName("");
        setNewExpenseAmount("");
    };

    return (
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
                    {expenses.map((expense, index) => (
                        <li key={index} className="flex justify-between border-b pb-2">
                            <span className="text-gray-700">{expense.name}</span>
                            <span className="text-gray-900 font-semibold">${expense.amount.toFixed(2)}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
