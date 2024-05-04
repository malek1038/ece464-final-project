import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken, dropToken } from "./Auth";
import api from "./api";

const Profile = () => {
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const token = fetchToken();

    const logOut = () => {
        dropToken();
        navigate("/");
    };

    const fetchUser = async () => {
        try {
            const response = await api.get(`/users/${token}`);
            setUser(response.data);
        } catch (error) {
            console.error("Failed to fetch user:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div>
            <h2>Welcome, {user.uname || 'Loading...'}</h2>
            <p>Profile page</p>
            <button onClick={logOut}>Log Out</button>
        </div>
    );
};

export default Profile;
