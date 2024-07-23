import React, { useState } from "react";

const TodoItem = ({ todo, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false); //Boolean state to handle the edit button for an item
  const [editedTitle, setEditedTitle] = useState(todo.title); //To handle the edited value of todo item

  //Menthod to enable edit button
  const handleEdit = () => {
    setIsEditing(true);
  };

  //Method to save the edited item by calling the onEdit method from the parent component
  const handleSaveEdit = () => {
    onEdit(todo.id, editedTitle);
    setIsEditing(false);
  };

  return (
    <div>
      <li className="d-flex justify-content-between align-items-center mb-3 todo-item">
        <div className="todo-title">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="form-control "
            />
          ) : (
            <span className={todo.completed ? "text-muted" : ""}>
              {todo.title}
            </span>
          )}
        </div>
        <div className="d-flex gap-2">
          <button
            className={`btn btn-sm ${
              isEditing ? "btn-success" : "btn-secondary"
            }`}
            onClick={isEditing ? handleSaveEdit : handleEdit}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
          />
        </div>
      </li>
    </div>
  );
};

export default TodoItem;
