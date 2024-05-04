// This file contains the main menu component It will have a block grid of available events

import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { fetchToken, dropToken } from './Auth';
import api from './api';

const MainMenu = () => {
    const navigate = useNavigate();
    const token = fetchToken();

    const logOut = () => {
        dropToken();
        navigate('/');
    };

    return (
        <div>
            <h2>Main Menu</h2>
            <Link to="/profile">Profile</Link>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
};

export default MainMenu