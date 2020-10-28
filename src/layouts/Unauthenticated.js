import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom'
import UnauthenticatedRoutes from '../routes/unauthenticated'

export default function Authenticated() {
    return (
        <div>
            <Switch>
                {UnauthenticatedRoutes.map((prop, key) => {
                    if (prop.redirect)
                        return <Redirect from={prop.path} to={prop.to} key={key} />
                    else return (
                        <Route
                            path={prop.path}
                            key={key}
                            exact={true}
                            component={prop.component}
                        />
                    )
                })}
            </Switch>
        </div>
    )
}