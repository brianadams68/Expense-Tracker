import React from "react";
import ExpenseItem from "./ExpenseItem";

const ActiveExpenseList = ({
  activeExpenses,
  onEdit,
  onMarkAsDone,
  onDelete,
  dateAdded
}) => {
  return (
    <div className="mr-2">
      <h2 className="text-xl font-semibold mb-4 my-10">Active Expenses</h2>
      {activeExpenses.length === 0 ? (
        <p className="text-gray-600">There is no active expense.</p>
      ) : (
        <ul>
          {activeExpenses.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onEdit={onEdit}
              onMarkAsDone={onMarkAsDone}
              onDelete={onDelete}
              dateAdded={dateAdded}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActiveExpenseList;
