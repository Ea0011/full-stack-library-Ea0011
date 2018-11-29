import { Route, Redirect } from 'react-router-dom'
import React from "react"
import { DataContext } from '../context/Data';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <DataContext.Consumer>
        {context => (
            <Route {...rest}
                render={props => (context.currentAuthor && window.localStorage.getItem("Authorization") ? 
                <Component {...props} /> : 
                <Redirect to='/login' />)}
            />
        )}
    </DataContext.Consumer>
)