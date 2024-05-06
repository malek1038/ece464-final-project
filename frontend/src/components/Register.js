import React, { useState } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        uname: '',
        passw: '',
        email: '',
        admin: '0',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/createUser/', formData);
            alert('Account created successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error creating account:', error);
            alert('Failed to create account!');
        }
    };

    return (
        <div className="login-container">
            <header className="login-header">
                <h1>Eventify</h1>
            </header>
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input name="uname" type="text" value={formData.uname} onChange={handleChange} placeholder="Username" required/>
                <input name="passw" type="password" value={formData.passw} onChange={handleChange} placeholder="Password" required/>
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required/>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
