import React, {useState} from 'react';
import api from './api'
import { setToken } from './Auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async() => {
        const response = await api.post('/login/', {
            uname: username,
            passw: password
        })
        if (response.data < 0) {
            alert('Username or password is incorrect')
        }
        else {
            setToken(response.data)
            navigate("/main-menu")
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type='text'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Enter</button>
        </div>
    );
};

export default Login