import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from './context/auth';
import Login from './auth/Login';
import AuthVoter from "./auth/AuthVoter";
import Register from "./auth/Register";
import VotersDashboard from "./dashboard/voter/Dashboard";
import AdminDashboard from "./dashboard/admin/Dashboard";
import PrivateRoute from "./PrivateRoute";

import { setAuthHeaderToken } from './api';

export default function App() {
  document.title = "Election";

  const [authToken, setAuthToken] = useState(
    JSON.parse(localStorage.getItem("authData"))
  );

  const setToken = (authData) => {
    authData === null
      ? localStorage.clear()
      : localStorage.setItem("authData", JSON.stringify(authData));
    setAuthToken(authData);
  };

  setAuthHeaderToken(authToken);

  return (
      <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
        <Router>
          <Switch>
            <Route exact path="/admin/login" component={Login} />
            <Route exact path="/login" component={AuthVoter} />
            <Route exact path="/register" component={Register} />
            <PrivateRoute exact path="/" component={VotersDashboard} />
            
            <PrivateRoute exact path="/admin" component={AdminDashboard} />
            <Route
              render={() => (
                <h1 className="jumbotron text-center">404 | Not Found</h1>
              )}
            />
          </Switch>
        </Router>
      </AuthContext.Provider>
  );
}
