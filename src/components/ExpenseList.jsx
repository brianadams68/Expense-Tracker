import React from 'react';
import ExpenseItem from './ExpenseItem';

const ExpenseList = ({ activeExpenses, completedExpenses, onEdit, onMarkAsDone, onDelete }) => {
  const calculateTotalAmount = () => {
    return completedExpenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <div className="flex">
      <div className="w-1/2 pr-4">
        <h2 className="text-xl font-semibold mb-4">Active Expenses</h2>
        <ul>
          {activeExpenses.map((expense) => (
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
      <div className="w-1/2 pl-4">
        <h2 className="text-xl font-semibold mb-4">Completed Expenses</h2>
        <ul>
          {completedExpenses.map((expense) => (
            <li key={expense.id}>
              {expense.title} - ${expense.amount}
            </li>
          ))}
        </ul>
        {completedExpenses.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold">Total Amount Expended: ${calculateTotalAmount()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;

