import React, { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTodo(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todoinput">
      <input
        className=" form-control"
        type="text"
        placeholder="Add a todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
