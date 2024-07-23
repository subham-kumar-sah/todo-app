import React, { useState, useContext, useEffect } from "react";
import TodoItem from "./TodoItem";
import AuthContext from "../Authentication/AuthContext";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const { user, logout } = useContext(AuthContext);
  const [todos, setTodos] = useState([]); //For storing the todo items
  const [filter, setFilter] = useState("all"); //To store the filtered state

  //The filter options provided manually
  const filterOptions = {
    all: "All",
    active: "Active",
    completed: "Completed",
  };

  //To locally fetch the todo items based on username
  useEffect(() => {
    const storedTodos =
      JSON.parse(localStorage.getItem(`todos_${user.username}`)) || [];
    setTodos(storedTodos);
  }, [user.username]);

  //To locally store the todo items based on username
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem(`todos_${user.username}`, JSON.stringify(todos));
    }
  }, [user.username, todos]);

  //To filter items based on their status
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

  //Adding a new item to the list
  const addTodo = (title) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos([...todos, newTodo]);
  };

  //Editing the items in todo list
  const editTodo = (id, title) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)));
  };

  //To togggle a todo's state by checking/unchecking the checkbox
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  //To remove a todo item from the list
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <div className="container p-3">
        <div className="row">
          <h2>User : {user.username}</h2>
          <TodoForm onAddTodo={addTodo} />
          <div className="filterbuttons mb-4">
            {Object.keys(filterOptions).map((filterKey) => {
              const buttonText = filterOptions[filterKey];
              let buttonClass = "btn"; // Default class
              if (buttonText === "All") {
                buttonClass += " btn-info";
              } else if (buttonText === "Completed") {
                buttonClass += " btn-success";
              } else if (buttonText === "Active") {
                buttonClass += " btn-warning";
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
          <ul className="todo-list">
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
          <button className="btn btn-dark logoutbtn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoList;
