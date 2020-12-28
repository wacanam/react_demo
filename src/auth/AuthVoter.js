import { Redirect } from "react-router-dom";
import React, { useState } from "react";
import api from "../api";
import { useAuth } from "../context/auth";

function AuthVoter() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [feedbackMsg, setFeedbackMsg] = useState();

  const { authToken, setAuthToken } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      api
        .post("user/login", { username, password })
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
    <Redirect exact to="/" />
  ) : (
    <div>
      <div className="container jumbotron col-6">
        <div className="">
          <h2 className="text-center">Voter's Login</h2>
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
            <label htmlFor="voters_id">Voter's ID:</label>
            <input
              type="text"
              className="form-control"
              id="voters_id"
              placeholder="Enter voter's ID"
              name="voters_id"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="voters_key">Voter's Key:</label>
            <input
              type="password"
              className="form-control"
              id="voters_key"
              placeholder="Enter voter's key"
              name="voters_key"
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

export default React.memo(AuthVoter);
