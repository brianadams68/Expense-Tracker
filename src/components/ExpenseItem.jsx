import React, { useState } from 'react';

const ExpenseItem = ({ expense, onEdit, onMarkAsDone, onDelete }) => {
  const { id, title, amount, isDone } = expense;
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedAmount, setUpdatedAmount] = useState(amount);

  const handleUpdate = () => {
    onEdit(id, { title: updatedTitle, amount: updatedAmount });

    setIsEditing(false);
  };

  return (
    <li>
      <div className="flex items-center justify-between bg-white p-4 rounded-md shadow-md mb-4">
        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="mr-2 p-2 border rounded-md"
            />
            <input
              type="number"
              value={updatedAmount}
              onChange={(e) => setUpdatedAmount(e.target.value)}
              className="mr-2 p-2 border rounded-md"
            />
            <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded-md">
              Update
            </button>
          </>
        ) : (
          <>
            <div>
              <span className="text-lg font-semibold">{title}</span>
              <span className="ml-4 text-gray-600">€{amount}</span>
            </div>
            <div className="flex items-center">
              {!isDone && (
                <>
                  <button onClick={() => setIsEditing(true)} className="text-blue-500 mr-2">
                    Edit
                  </button>
                  <button onClick={() => onMarkAsDone(id)} className="text-green-500 mr-2">
                    Done
                  </button>
                </>
              )}
              <button onClick={() => onDelete(id)} className="text-red-500">
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default ExpenseItem;


