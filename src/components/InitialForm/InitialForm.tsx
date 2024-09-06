import React, { useState } from 'react';
import './InitialForm.css';

interface InitialFormProps {
  setBudget: (budget: number) => void;
  handleNextPage: () => void;
}

const InitialForm: React.FC<InitialFormProps> = ({ setBudget, handleNextPage }) => {
  const [inputBudget, setInputBudget] = useState<number | ''>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    console.log("Input Value:", value); 
   
    setInputBudget(value);
    setIsButtonDisabled(value <= 0 || isNaN(value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (typeof inputBudget === 'number' && inputBudget > 0) {
      setBudget(inputBudget);
      handleNextPage();
    }
  };

  return (
    <div className="form-section">
      <h2>Define your budget</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter your budget"
          value={inputBudget === '' ? '' : inputBudget}
          onChange={handleInputChange}
          className="input-budget"
        />
        <button type="submit" disabled={isButtonDisabled} className="button-budget">
          Define Budget
        </button>
      </form>
    </div>
  );
};

export default InitialForm;
