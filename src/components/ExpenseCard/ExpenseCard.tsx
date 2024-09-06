import React, { useState } from 'react';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import './ExpenseCard.css';
import Modal from '../Modal/Modal';

interface Expense {
    name: string;
    amount: number;
    category: string;
    date: string;
}

interface ExpenseCardProps {
    expenses: Expense[];
    onDelete: (expense: Expense) => void;
    onAddExpense: (newExpense: Expense) => void;
    onEditExpense: (updatedExpense: Expense) => void;
    remainingBudget: number;
}

const categoryImages: { [key: string]: string } = {
    Food: 'https://66ac79720e9243e026ef4214--whimsical-stardust-cc5391.netlify.app/icono_comida.svg',
    Savings: 'https://66ac79720e9243e026ef4214--whimsical-stardust-cc5391.netlify.app/icono_ahorro.svg',
    House: 'https://66ac79720e9243e026ef4214--whimsical-stardust-cc5391.netlify.app/icono_casa.svg',
    Health: 'https://66ac79720e9243e026ef4214--whimsical-stardust-cc5391.netlify.app/icono_salud.svg',
};

const ExpenseCard: React.FC<ExpenseCardProps> = ({ expenses, onDelete, onAddExpense, onEditExpense, remainingBudget }) => {
    const [showModal, setShowModal] = useState(false);
    const [expenseToEdit, setExpenseToEdit] = useState<Expense | null>(null);

    const handleOpenModal = (expense: Expense) => {
        setExpenseToEdit(expense);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setExpenseToEdit(null);
    };

    const handleEditExpense = (updatedExpense: Expense) => {
        onEditExpense(updatedExpense); 
        handleCloseModal();
    };

    const leadingActions = (index: number) => (
        <LeadingActions>
            <SwipeAction onClick={() => handleOpenModal(expenses[index])}>Edit</SwipeAction>
        </LeadingActions>
    );

    const trailingActions = (index: number) => (
        <TrailingActions>
            <SwipeAction destructive={true} onClick={() => onDelete(expenses[index])}>
                Delete
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <div className="expense-cards-container">
            <h3 className="expenses-title">
                {expenses.length > 0 ? 'Expenses List:' : 'No Expenses...'}
            </h3>
            <SwipeableList>
                {expenses.map((expense, index) => (
                    <SwipeableListItem
                        key={index}
                        leadingActions={leadingActions(index)}
                        trailingActions={trailingActions(index)}
                    >
                        <div className="expense-card">
                            <img 
                                src={categoryImages[expense.category] || 'url_de_imagen_por_defecto'} 
                                alt={expense.category} 
                                className="expense-image" 
                            />
                            <div className="expense-details">
                                <p className="expense-category">{expense.category}</p>
                                <p className="expense-name">{expense.name}</p>
                                <p className="expense-date">{expense.date}</p>
                            </div>
                            <div className="expense-amount-container">
                                <p className="expense-amount">${expense.amount.toFixed(2)}</p>
                            </div>
                        </div>
                    </SwipeableListItem>
                ))}
            </SwipeableList>

            {showModal && expenseToEdit && (
                <Modal
                    show={showModal}
                    onClose={handleCloseModal}
                    onAddExpense={handleEditExpense} // La función para manejar la edición
                    remainingBudget={remainingBudget}
                    expenseToEdit={expenseToEdit}
                />
            )}
        </div>
    );
};

export default ExpenseCard;
