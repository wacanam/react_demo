import React, { useState } from "react";
import api from "../api";

function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [first_name, setFirst_name] = useState();
  const [last_name, setLast_name] = useState();
  const [email, setEmail] = useState();
  const [feedbackMsg, setFeedbackMsg] = useState();

  const handleRegister = (e) => {
    e.preventDefault();
    if (username && password) {
      api
        .post("user/register", { username, password, first_name, last_name, email })
        .then((res) => {
          console.log(res);
          setFeedbackMsg(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <div className="container jumbotron col-6">
        <div className="">
          <h2 className="text-center">Register Voter</h2>
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
        <form onSubmit={handleRegister.bind(this)}>
          <div className="form-group">
            <label htmlFor="voters_id">Voter's ID:</label>
            <input
              type="text"
              className="form-control"
              id="voters_id"
              placeholder="Enter voters_id"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="voters_key">Voter's Key:</label>
            <input
              type="password"
              className="form-control"
              id="voters_key"
              placeholder="Enter Voter's Key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="first_name">First name:</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="Enter First name"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last name:</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Enter Last name"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary btn-block">
              Regiter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(Register);
