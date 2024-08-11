import React, { useState } from "react";
import axios from "axios";

const Login = ({ setAuthenticated }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        // Add your login logic here
        try {
            const response = await axios.post('/api/login', {
                username,
                email,
                password
            });
            if (response.data.authenticated) {
                setAuthenticated(true);
            }
        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <div className="wrapper">
            <div className="section informational">
                <h1>Storing your memories, made easy.</h1>
                <h4>From your child’s first steps to their last tooth, never lose track of the memories important to you.</h4>
                <p>Or, <a href="/create-account">create an account</a> if you don't have an account with us.</p>
            </div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="button" onClick={togglePasswordVisibility}>
                            {passwordVisible ? "Hide" : "Show"} Password
                        </button>
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;