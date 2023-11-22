import React, { useState } from 'react';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  const [activeExpenses, setActiveExpenses] = useState([]);
  const [completedExpenses, setCompletedExpenses] = useState([]);

  const addExpenseHandler = (newExpense) => {
    setActiveExpenses((prevActiveExpenses) => [newExpense, ...prevActiveExpenses]);
  };

  const markAsDoneHandler = (id) => {
    const updatedActiveExpenses = activeExpenses.filter((expense) => expense.id !== id);
    const completedExpense = activeExpenses.find((expense) => expense.id === id);

    setCompletedExpenses((prevCompletedExpenses) => [completedExpense, ...prevCompletedExpenses]);
    setActiveExpenses(updatedActiveExpenses);
  };

  const deleteExpenseHandler = (id) => {
    setActiveExpenses((prevActiveExpenses) => prevActiveExpenses.filter((expense) => expense.id !== id));
  };

  const editExpenseHandler = (id, updatedExpense) => {
    setActiveExpenses((prevActiveExpenses) =>
      prevActiveExpenses.map((expense) => (expense.id === id ? { ...expense, ...updatedExpense } : expense))
    );
  };

  return (
    <>
      <ExpenseForm onAddExpense={addExpenseHandler} />
      <ExpenseList
        activeExpenses={activeExpenses}
        completedExpenses={completedExpenses}
        onEdit={editExpenseHandler}
        onMarkAsDone={markAsDoneHandler}
        onDelete={deleteExpenseHandler}
      />
    </>
  );
}

export default App;




