import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import CompletedExpenseList from "./components/CompletedExpenseList";
import ActiveExpenseList from "./components/ActiveExpenseList";

function App() {
  const [activeExpenses, setActiveExpenses] = useState([]);
  const [completedExpenses, setCompletedExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const storedCompletedExpenses =
      JSON.parse(localStorage.getItem("expensesCompleted")) || [];

    const active = storedExpenses.filter((expense) => !expense.isDone);
    const completed = storedCompletedExpenses;

    setActiveExpenses(active);
    setCompletedExpenses(completed);
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

    localStorage.setItem(
      "expensesCompleted",
      JSON.stringify([...completedExpenses, completedExpense])
    );

    saveExpensesToStorage(updatedActiveExpenses);
  };

  const deleteExpenseHandler = (id) => {
    const deletedExpense = activeExpenses.find((expense) => expense.id === id);
    const updatedActiveExpenses = activeExpenses.filter(
      (expense) => expense.id !== id
    );

    if (deletedExpense && deletedExpense.isDone) {
      setCompletedExpenses((prevCompletedExpenses) =>
        prevCompletedExpenses.filter((expense) => expense.id !== id)
      );
      localStorage.setItem(
        "expensesCompleted",
        JSON.stringify(completedExpenses.filter((expense) => expense.id !== id))
      );
    }

    setActiveExpenses(updatedActiveExpenses);
    saveExpensesToStorage(updatedActiveExpenses);
  };

  const editExpenseHandler = (id, updatedExpense) => {
    const updatedActiveExpenses = activeExpenses.map((expense) =>
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    );

    setActiveExpenses(updatedActiveExpenses);

    const editedExpense = updatedActiveExpenses.find(
      (expense) => expense.id === id
    );

    if (editedExpense && editedExpense.isDone) {
      setCompletedExpenses((prevCompletedExpenses) =>
        prevCompletedExpenses.map((expense) =>
          expense.id === id ? { ...expense, ...updatedExpense } : expense
        )
      );
      localStorage.setItem(
        "expensesCompleted",
        JSON.stringify(
          completedExpenses.map((expense) =>
            expense.id === id ? { ...expense, ...updatedExpense } : expense
          )
        )
      );
    }

    const allExpenses = [...updatedActiveExpenses, ...completedExpenses];
    saveExpensesToStorage(allExpenses);
  };

  return (
    <>
      <ExpenseForm onAddExpense={addExpenseHandler} />
      <div className="">
        <div className="">
          <ActiveExpenseList
            activeExpenses={activeExpenses}
            onEdit={editExpenseHandler}
            onMarkAsDone={markAsDoneHandler}
            onDelete={deleteExpenseHandler}
          />
        </div>
        <div>
          <CompletedExpenseList
            completedExpenses={completedExpenses}
            onEdit={editExpenseHandler}
            onDelete={deleteExpenseHandler}
          />
        </div>
      </div>
    </>
  );
}

export default App;
