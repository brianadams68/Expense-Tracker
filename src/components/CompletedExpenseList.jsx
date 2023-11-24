import React from "react";
import ExpenseItem from "./ExpenseItem";

const CompletedExpenseList = ({ completedExpenses, onDelete, onEdit }) => {
  console.log("Received completed expenses:", completedExpenses);


  return (
    <div className="w-full sm:w-1/2 pr-4">
      <h2 className="text-xl font-semibold mb-4">Completed Expenses</h2>
      <ul>
        {completedExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
};

export default CompletedExpenseList;
