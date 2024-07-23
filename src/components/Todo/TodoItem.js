import React, { useState } from "react";

const TodoItem = ({ todo, onToggleComplete, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onEdit(todo.id, editedTitle);
    setIsEditing(false);
  };

  return (
    <div>
      <li>
        <div>
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <span>{todo.title}</span>
          )}
        </div>

        <div>
          <>
            <button onClick={isEditing ? handleSaveEdit : handleEdit}>
              {isEditing ? "Save" : "Edit"}
            </button>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggleComplete(todo.id)}
            />
          </>
        </div>
      </li>
    </div>
  );
};

export default TodoItem;
