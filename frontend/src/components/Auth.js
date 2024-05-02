import React from 'react'
import {Navigate, useLocation} from 'react-router-dom'

// Storing token
export const setToken = (token) => {
    localStorage.setItem('userToken', token)
};

// Fetching token
export const fetchToken = () => {
    return localStorage.getItem('userToken')
};

// Drop token
export const dropToken = () => {
    localStorage.removeItem('userToken')
}

// Requiring token
export function RequireToken({children}) {
    let auth = fetchToken();
    let location = useLocation();

    if (!auth) {
        return <Navigate to="/" state={{ from: location}}/>;
    }

    return children;
}