import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [activeExpenses, setActiveExpenses] = useState([]);
  const [completedExpenses, setCompletedExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    if (storedExpenses) {
      const active = storedExpenses.filter((expense) => !expense.isDone);
      const completed = storedExpenses.filter((expense) => expense.isDone);
      setActiveExpenses(active);
      setCompletedExpenses(completed);
    }
  }, []);

  const saveExpensesToStorage = (allExpenses) => {
    localStorage.setItem("expenses", JSON.stringify(allExpenses));
  };

  const addExpenseHandler = (newExpense) => {
    const updatedActiveExpenses = [newExpense, ...activeExpenses];
    setActiveExpenses(updatedActiveExpenses);

    const allExpenses = [...updatedActiveExpenses, ...completedExpenses];
    saveExpensesToStorage(allExpenses);
  };

  const markAsDoneHandler = (id) => {
    const updatedActiveExpenses = activeExpenses.filter(
      (expense) => expense.id !== id
    );
    const completedExpense = activeExpenses.find(
      (expense) => expense.id === id
    );

    setCompletedExpenses((prevCompletedExpenses) => [
      completedExpense,
      ...prevCompletedExpenses,
    ]);
    setActiveExpenses(updatedActiveExpenses);

    // Save all expenses to localStorage
    setTimeout(() => {
      const allExpenses = [...updatedActiveExpenses, ...completedExpenses];
      saveExpensesToStorage(allExpenses);
    }, 0);
  };

  const deleteExpenseHandler = (id) => {
    const updatedActiveExpenses = activeExpenses.filter(
      (expense) => expense.id !== id
    );
    setActiveExpenses(updatedActiveExpenses);

    const allExpenses = [...updatedActiveExpenses, ...completedExpenses];
    saveExpensesToStorage(allExpenses);
  };

  const editExpenseHandler = (id, updatedExpense) => {
    const updatedActiveExpenses = activeExpenses.map((expense) =>
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    );
    setActiveExpenses(updatedActiveExpenses);

    const allExpenses = [...updatedActiveExpenses, ...completedExpenses];
    saveExpensesToStorage(allExpenses);
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
