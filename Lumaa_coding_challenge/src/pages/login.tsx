import React, { useState } from 'react';
import './../styles/Login.css';
import Header from '../components/header';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');
        try {
            if (isLogin) {
                // Handle login
                const response = await axios.post('http://localhost:3001/login', { username, password });
                console.log(response.data);
                navigate('/tasks');
            } else {
                // Handle sign-up
                const response = await axios.post('http://localhost:3001/users', { username, password });
                console.log(response.data);
                navigate('/tasks');
            }
        } catch (err) {
            console.error(err);
            setError('Failed to login or sign up');
        }
    };

    return (
        <>
            <Header username={'Username'}></Header>
            <div className="login-container">
                <div className="tabs">
                    <div
                        className={`tab ${isLogin ? 'active' : 'inactive'}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </div>
                    <div
                        className={`tab ${!isLogin ? 'active' : 'inactive'}`}
                        onClick={() => setIsLogin(false)}
                    >
                        Sign Up
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
                </form>
            </div>
        </>
    );
}