import React from 'react';
import './InfoBudgetDisplay.css'; 
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface BudgetDisplayProps {
    budget: number;
    remaining: number;
    expense: number;
}

const BudgetDisplay: React.FC<BudgetDisplayProps> = ({ budget, remaining, expense }) => {
    const percentageUsed = (expense / budget) * 100;

    return (
        <div className='budget-display'>
            <div className='budget-image'>
                <CircularProgressbar
                    value={percentageUsed}
                    text={`${percentageUsed.toFixed(0)}% expended`} 
                    styles={buildStyles({
                        pathColor: 'rgb(84, 84, 234)', 
                        textColor: 'rgb(84, 84, 234)', 
                        trailColor: '#d6d6d6', 
                        textSize: '12px',
                    })}
                />
            </div>
            <div className='budget-info'>
                <p className='budget-item'>Budget: ${budget.toFixed(2)}</p>
                <p className='budget-item'>Remaining: ${remaining.toFixed(2)}</p>
                <p className='budget-item'>Expense: ${expense.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default BudgetDisplay;
