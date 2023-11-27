import React, { useState, useEffect } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import CompletedExpenseList from "./components/CompletedExpenseList";
import ActiveExpenseList from "./components/ActiveExpenseList";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpenseHandler = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const markAsDoneHandler = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((e) =>
        e.id === id ? { ...e, isDone: true } : e
      )
    );
  };

  const deleteExpenseHandler = (id) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((e) => e.id !== id)
    );
  };

  const editExpenseHandler = (id, updatedData) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((e) =>
        e.id === id ? { ...e, ...updatedData } : e
      )
    );
  };

  return (
    <>
    <ExpenseForm onAddExpense={addExpenseHandler} />
    <div className="flex justify-center">
      <div className="flex flex-wrap w-full max-w-screen-lg justify-center ">
        <div className="mb-4 w-full sm:w-1/2">
          <ActiveExpenseList
            activeExpenses={expenses.filter((e) => !e.isDone)}
            onEdit={editExpenseHandler}
            onMarkAsDone={markAsDoneHandler}
            onDelete={deleteExpenseHandler}
          />
        </div>
        <div className="mb-4 w-full sm:w-1/2">
          <CompletedExpenseList
            completedExpenses={expenses.filter((e) => e.isDone)}
            onEdit={editExpenseHandler}
            onDelete={deleteExpenseHandler}
          />
        </div>
      </div>
    </div>
  </>  
  );
}

export default App;


