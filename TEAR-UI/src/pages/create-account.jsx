import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateAccount() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [message, setMessage] = useState("");

    const registerUser = async () => {
        try {
            const response = await axios.post("http://localhost:3300/user/create-account", {
                username,
                password,
                firstName,
                lastName,
                email,
            }, {
                withCredentials: true,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed");
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== verifyPassword) {
            setMessage("Passwords do not match");
            return;
        }
        await registerUser();
    };

    return (
        <div className="wrapper">
            <div className="section informational">
                <h1>We're glad you're here.</h1>
                <h4>Sign up and get started for free!</h4>
                <p>Or, <a href="/login">Login</a> if you already have an account.</p>
            </div>
            <div>
                <h2>Create Account</h2>
                <form onSubmit={handleRegister}>
                    <input type="text" value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <input type="text" value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                    />
                    <input type="text" value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                    />
                    <input type="text" value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                    <input type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <input type="password" value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        placeholder="Verify Password"
                    />
                    <button type="submit">Create Account</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default CreateAccount;