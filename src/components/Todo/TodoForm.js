import React, { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState("");

  //To handle the submission of Todo list form i.e the todo text and add button
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
        placeholder="Enter here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Add Item
      </button>
    </form>
  );
};

export default TodoForm;
