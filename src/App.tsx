import { useState, useEffect } from 'react';
import Principal from './components/PrincipalWindow/PrincipalWindow';
import FirstPage from './components/FirstPage/FirsrPage';

function App() {
  const [isSecondScreen, setIsSecondScreen] = useState(false);
  const [budget, setBudget] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(budget);
  const [expense, setExpense] = useState<number>(0);

  const handleButtonClick = () => {
    setIsSecondScreen(true);
  };

  const handleReset = () => {
    setBudget(0);
    setRemaining(0);
    setExpense(0);
    setIsSecondScreen(false); 
  };


  useEffect(() => {
    setRemaining(budget);
  }, [budget]);

  return (
    <>
      {!isSecondScreen ? (
        <FirstPage 
          setBudget={setBudget} 
          handleNextPage={handleButtonClick} 
        />
      ) : (
        <Principal
          budget={budget}
          remaining={remaining}
          expense={expense}
          setRemaining={setRemaining}
          setExpense={setExpense}
          onReset={handleReset} 
        />
      )}
    </>
  );
}

export default App;
