import React from "react";
import { useAuthContext } from "context/authentication";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component, ...rest }) => {
    const { isAuthenticated } = useAuthContext();
    const WrappedComponent = component;
    return (
        <Route {...rest}>
            {isAuthenticated ? (
                /* user already authenticate */
                <WrappedComponent />
            ) : (
                /* user not authenticate */
                <Redirect to="/signin" />
            )}
        </Route>
    );
};

export default AuthRoute;
