import React, { useState } from 'react';
import './../styles/Login.css';
import Header from '../components/header';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // Handle login or sign-up logic here
        console.log('Username:', username);
        console.log('Password:', password);
        console.log(isLogin ? 'Logging in...' : 'Signing up...');
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