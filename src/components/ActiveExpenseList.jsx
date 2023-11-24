import React from "react";
import ExpenseItem from "./ExpenseItem";

const ActiveExpenseList = ({ activeExpenses, onEdit, onMarkAsDone, onDelete }) => {
  console.log("Received active expenses:", activeExpenses);

  const expensesToRender = activeExpenses || [];

  return (
    <div className="flex flex-wrap mt-10">
      <div className="w-full sm:w-1/2 pr-4">
        <h2 className="text-xl font-semibold mb-4">Active Expenses</h2>
        <ul>
          {expensesToRender.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onMarkAsDone={onMarkAsDone}
              onDelete={onDelete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActiveExpenseList;

