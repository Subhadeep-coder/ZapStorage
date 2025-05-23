import React from 'react'
import { Navigate, Route } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const PrivateRoute = ({ component: Component, ...rest }) => {

    const { currentUser } = useAuth();

    return (
        <Route
            {...rest}
            render={props => {
                return currentUser ? <Component {...props} /> : <Navigate to={`/login`} />
            }}
        >
        </Route>
    )
}

export default PrivateRoute