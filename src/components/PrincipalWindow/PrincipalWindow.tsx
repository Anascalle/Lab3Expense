import React, { useState, useEffect } from 'react';
import BudgetDisplay from '../InfoBudget/InfoBudget';
import Banner from '../Banner/Banner';
import ButtonModal from '../ButtonModal/ButtonModal';
import ExpenseCard from '../ExpenseCard/ExpenseCard';
import Filter from '../Filter/Filter';

interface Expense {
    name: string;
    amount: number;
    category: string;
    date: string;
}

interface PrincipalProps {
    budget: number;
    remaining: number;
    expense: number;
    setRemaining: (remaining: number) => void;
    setExpense: (expense: number) => void;
    onReset: () => void;
}

const Principal: React.FC<PrincipalProps> = ({ budget, remaining, expense, setRemaining, setExpense, onReset }) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        setExpense(totalExpense);
        setRemaining(budget - totalExpense);
    }, [expenses, budget, setExpense, setRemaining]);

    const handleAddExpense = (newExpense: Expense) => {
        setExpenses(prevExpenses => [...prevExpenses, newExpense]);
    };

    const handleDeleteExpense = (expenseToDelete: Expense) => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense !== expenseToDelete));
    };

    const handleEditExpense = (updatedExpense: Expense) => {
        setExpenses(prevExpenses =>
            prevExpenses.map(expense =>
                expense.name === updatedExpense.name && expense.date === updatedExpense.date
                    ? updatedExpense
                    : expense
            )
        );
    };

    const filteredExpenses = selectedCategory
        ? expenses.filter(expense => expense.category === selectedCategory)
        : expenses;

    return (
        <>
            <Banner 
                title="EXPENSE PLANNER" 
                showButton={true} 
                onReset={onReset} 
            />
            <BudgetDisplay 
                budget={budget} 
                remaining={remaining} 
                expense={expense} 
            />
            <ButtonModal 
                onAddExpense={handleAddExpense} 
                remainingBudget={remaining} 
            />
            <Filter 
                categories={["Food", "Savings", "House", "Health"]} 
                selectedCategory={selectedCategory} 
                onCategoryChange={setSelectedCategory} 
            />
            <ExpenseCard 
                expenses={filteredExpenses}
                onDelete={handleDeleteExpense} 
                onAddExpense={handleAddExpense} 
                onEditExpense={handleEditExpense}
                remainingBudget={remaining} 
            />
        </>
    );
};

export default Principal;
