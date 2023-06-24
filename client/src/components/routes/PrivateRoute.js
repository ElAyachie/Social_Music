import { Redirect, Route } from "react-router"
import React from 'react';

function PrivateRoute({ component: Component, path, ...rest }) {
    const user = localStorage.getItem("user");
    let authed = false;

    if (user !== undefined && user !== null) {
      authed = true;
    }
    else {
      authed = false;
    }

    return(
        <Route
            path={path}
            {...rest}
            render={(props) => {
            return authed ? <Component {...props} /> : <Redirect to="/welcome" />;
            }}
        />
    );
}

export default PrivateRoute;
