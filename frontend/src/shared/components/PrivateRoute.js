import React from 'react';
import { Redirect, Route } from "react-router-dom";
import { isLoggedIn } from '../../core/auth.js';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isLoggedIn() ? (
                <Component props={{...props}} data={{...rest}} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute