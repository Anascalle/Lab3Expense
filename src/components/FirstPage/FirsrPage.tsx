import React from 'react';
import Banner from '../Banner/Banner';
import InitialForm from '../InitialForm/InitialForm';

interface FirstPageProps {
  setBudget: (budget: number) => void;
  handleNextPage: () => void;
}

const FirstPage: React.FC<FirstPageProps> = ({ setBudget, handleNextPage }) => {
  return (
    <>
      <Banner title="EXPENSE PLANNER" showButton={false} />
      <InitialForm setBudget={setBudget} handleNextPage={handleNextPage} />
    </>
  );
};

export default FirstPage;
