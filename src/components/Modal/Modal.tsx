import React, { useState, useEffect } from 'react';
import './Modal.css';

interface Expense {
    name: string;
    amount: number;
    category: string;
    date: string;
}

interface ModalProps {
    show: boolean;
    onClose: () => void;
    onAddExpense: (newExpense: Expense) => void;
    remainingBudget: number;
    expenseToEdit?: Expense; 
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onAddExpense, remainingBudget, expenseToEdit }) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        if (expenseToEdit) {
            setName(expenseToEdit.name);
            setAmount(expenseToEdit.amount);
            setCategory(expenseToEdit.category);
            setDate(expenseToEdit.date);
        } else {
            setName('');
            setAmount(0);
            setCategory('');
            setDate('');
        }
    }, [expenseToEdit]);
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !amount || !category || !date) {
            setError('All fields are required.');
            return;
        }
        if (amount <= 0) {
            setError('Amount must be positive.');
            return;
        }
        if (amount > remainingBudget) {
            setError('Amount exceeds the remaining budget.');
            return;
        }

        const updatedExpense = { name, amount, category, date };

        onAddExpense(updatedExpense);

        setName('');
        setAmount(0);
        setCategory('');
        setDate('');
        setError('');
        onClose();
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className='modal-title'>{expenseToEdit ? 'Edit Expense' : 'New Expense'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="expense-name">Expense Name:</label>
                        <input
                            type="text"
                            id="expense-name"
                            placeholder="Add expense name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="amount">Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category:</label>
                        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option value="">-- Select --</option>
                            <option value="Food">Food</option>
                            <option value="Savings">Savings</option>
                            <option value="House">House</option>
                            <option value="Health">Health</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="expense-date">Expense Date:</label>
                        <input
                            type="date"
                            id="expense-date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <button className='Add' type="submit">{expenseToEdit ? 'Update Expense' : 'Add Expense'}</button>
                    <button className='close' type="button" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
