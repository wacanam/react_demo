import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/auth";

function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [feedbackMsg, setFeedbackMsg] = useState();

  const { authToken, setAuthToken } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      api
        .post("admin/login", { username, password })
        .then((res) => {
          console.log(res);
          setFeedbackMsg(res.data);
          if (res.status === 200) {
            setAuthToken(res.data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return authToken !== null && authToken.expires_in < Date.now() ? (
    <Redirect exact to="/admin" />
  ) : (
    <div>
      <div className="container jumbotron col-6">
        <div className="">
          <h2 className="text-center">Admin Login</h2>
          <p></p>
        </div>
        {feedbackMsg && (
          <div className="">
            <h6
              className={`text-center ${
                feedbackMsg.success ? "text-success" : "text-danger"
              }`}
            >
              {feedbackMsg.message}
            </h6>
            <p></p>
          </div>
        )}
        <form onSubmit={handleLogin.bind(this)}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="username"
              className="form-control"
              id="username"
              placeholder="Enter username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              id="pwd"
              placeholder="Enter password"
              name="pswd"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(Login);
