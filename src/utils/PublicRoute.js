import React from "react";
import { Route, Redirect } from "react-router-dom";
export default function PublicRoute({
    component: Component,
    restricted,
    isAuthenticated,
    ...rest
}) {
    return (
        <Route
            {...rest}
            component={(props) =>
                isAuthenticated && restricted ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}