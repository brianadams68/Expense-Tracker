import React from "react";
import ExpenseItem from "./ExpenseItem";

const CompletedExpenseList = ({ completedExpenses, onEdit, onDelete, dateAdded }) => {
  const totalExpenditure = completedExpenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  return (
    <div className="ml-2">
      <h2 className="text-xl font-semibold mb-4 my-10">Completed Expenses</h2>
      {completedExpenses.length === 0 ? (
        <p className="text-gray-600">There are no completed expenses.</p>
      ) : (
        <>
          <ul>
            {completedExpenses.map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onEdit={onEdit}
                onDelete={onDelete}
                dateAdded={dateAdded}
              />
            ))}
          </ul>
          <p>Total Expenditure: €{Number(totalExpenditure).toLocaleString()}</p>
        </>
      )}
    </div>
  );
};

export default CompletedExpenseList;
