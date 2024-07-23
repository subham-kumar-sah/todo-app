import React, { useState, useContext, useEffect } from "react";
import TodoItem from "./TodoItem";
import AuthContext from "../Authentication/AuthContext";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const filterOptions = {
    all: "All",
    active: "Active",
    completed: "Completed",
  };

  useEffect(() => {
    const storedTodos =
      JSON.parse(localStorage.getItem(`todos_${user.username}`)) || [];
    setTodos(storedTodos);
  }, [user.username]);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem(`todos_${user.username}`, JSON.stringify(todos));
    }
  }, [user.username, todos]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") {
      return true;
    } else if (filter === "active") {
      return !todo.completed;
    } else if (filter === "completed") {
      return todo.completed;
    }
    return true;
  });

  const addTodo = (title) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos([...todos, newTodo]);
  };
  const editTodo = (id, title) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)));
  };
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      {isAuthenticated ? (
        <div className="container p-3">
          <div className="row">
            <h2>User : {user.username}</h2>
            <TodoForm onAddTodo={addTodo} />
            <div className="filterbuttons">
              {Object.keys(filterOptions).map((filterKey) => {
                const buttonText = filterOptions[filterKey];
                let buttonClass = "btn"; // Default class
                if (buttonText === "All") {
                  buttonClass += " btn-warning";
                } else if (buttonText === "Completed") {
                  buttonClass += " btn-danger";
                } else if (buttonText === "Active") {
                  buttonClass += " btn-success";
                }
                return (
                  <button
                    className={buttonClass}
                    key={filterKey}
                    onClick={() => setFilter(filterKey)}
                  >
                    {filterOptions[filterKey]}
                  </button>
                );
              })}
            </div>
            <ul className="">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggleComplete={toggleComplete}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </ul>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      ) : (
        <p>Please login to view your todo list</p>
      )}
    </>
  );
};

export default TodoList;
