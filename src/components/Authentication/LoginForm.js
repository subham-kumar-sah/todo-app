// src/components/Authentication/LoginForm.jsx
import React, { useState, useContext } from "react";
import AuthContext from "./AuthContext";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
    setUsername("");
    setPassword("");
  };
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Username
              </label>
              <input
                type="text"
                value={username}
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                className="form-control"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-success" type="submit">
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
