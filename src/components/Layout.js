import React, { useContext } from "react";
import LoginForm from "./Authentication/LoginForm";
import TodoList from "./Todo/TodoList";
import AuthContext from "./Authentication/AuthContext";

const Layout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <>
          <TodoList />
        </>
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default Layout;
