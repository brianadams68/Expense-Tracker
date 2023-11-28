import React, { useState } from "react";

const ExpenseItem = ({
  expense,
  onEdit,
  onMarkAsDone,
  onDelete,
}) => {
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
              <div className="flex items-center flex-wrap justify-center gap-4">
                <svg
                  onClick={() => setIsEditing(true)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer text-blue-600 "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
                {!isDone && (
                  <svg
                    onClick={() => onMarkAsDone(id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 cursor-pointer text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                )}
                <svg
                  onClick={() => onDelete(id)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 cursor-pointer text-red-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default ExpenseItem;
