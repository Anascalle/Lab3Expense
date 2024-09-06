import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import './ButtonModal.css';


interface Expense {
    name: string;
    amount: number;
    category: string;
    date: string;
}

interface ButtonModalProps {
    onAddExpense: (newExpense: Expense) => void;
    remainingBudget: number; 
}

const ButtonModal: React.FC<ButtonModalProps> = ({ onAddExpense, remainingBudget }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="container">
                <button className="open-modal-button" onClick={openModal}>+</button>
            </div>
            <Modal 
                show={isModalOpen} 
                onClose={closeModal} 
                onAddExpense={onAddExpense} 
                remainingBudget={remainingBudget} 
            />
        </>
    );
};

export default ButtonModal;
