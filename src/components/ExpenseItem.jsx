import React, { useState } from "react";

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
              className="w-full sm:w-full md:w-32 mr-2 p-2 border rounded-md mb-2 sm:mb-0"
            />
            <input
              type="number"
              value={updatedAmount}
              onChange={(e) => setUpdatedAmount(e.target.value)}
              className="w-full sm:w-full md:w-20 mr-2 p-2 border rounded-md mb-2 sm:mb-0"
            />
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-3 py-2 rounded-md mb-2 sm:mb-0"
            >
              Update
            </button>
          </>
        ) : (
          <>
            <div className="max-w-md mx-auto bg-white p-6-md mt-8 sm:max-w-lg">
              <div className="mb-2 text-center">
                <span className="text-lg font-semibold">{title}</span>
                <span className="mt-1 text-gray-600"> €{amount}</span>
              </div>
              <div className="flex items-center flex-wrap justify-center">      
              {!isDone && (
                <>
                <button
                      onClick={() => setIsEditing(true)}
                      className="text-blue-500 px-2 py-1 mr-2 mb-2 sm:mb-0"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onMarkAsDone(id)}
                      className="text-green-500 px-2 py-1 mr-2 mb-2 sm:mb-0"
                    >
                      Done
                    </button>
                </>
                )}
                <button
                  onClick={() => onDelete(id)}
                  className="text-red-500 px-2 py-1 mb-2 sm:mb-0"
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default ExpenseItem;
