import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "./context/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const authData = useAuth();
    const isAuthenticated = (authData) => {
        return (authData.authToken !== null && authData.authToken.expires_in < Date.now())? true : false;
    }
    return <Route {...rest} render= {(props) => isAuthenticated(authData) ? (<Component {...props} />) : (<Redirect exact to="/login" />)}/>;
}
export default PrivateRoute;