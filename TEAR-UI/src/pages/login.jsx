import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:5173/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;

                localStorage.setItem("authtoken", token);
                localStorage.setItem("userEmail", email);

                const hasSavedMemories = await checkUserMemories(email);

                if (hasSavedMemories) {
                    navigate("/children");
                } else {
                    navigate("/memories");
                }
            } else {
                console.log("Login failed");
            }
        } catch (error) {
            console.log("Login failed", error);
        }
    };

    const checkUserMemories = async (email) => {
        try {
            const response = await fetch(`http://localhost:5000/api/memories?email=${email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authtoken")}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                return data.length > 0;
            } else {
                console.log("No memories found for the user");
                return false;
            }
        } catch (error) {
            console.log("Error fetching user memories", error);
            return false;
        }
    };

    return (
         <div className="wrapper">
        <div className="section informational">
            <h1>Storing your memories, made easy.</h1>
            <h4>From your child’s first steps to their last tooth, never lose track of the memories important to you.</h4>
            <p>Or, <a href="/create-account">create an account</a> if you don't have an account with us.</p>
        </div>
            <div className="form-container">
                <h1>Welcome back!</h1>
                <h4>Login to your account</h4>
                <form onSubmit={handleSubmit}>
                    <div className="input-box">
                        <span className="icon"></span>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <i className="uil uil-lock password"></i>
                    </div>
                    <div className="input-box">
                        <span className="icon"></span>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <i
                            className={`uil ${passwordVisible ? "uil-eye" : "uil-eye-slash"} pw`}
                            onClick={togglePasswordVisibility}
                            style={{ cursor: "pointer" }}
                        ></i>
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" className="checkbox-margin" />Remember me
                        </label>
                        <a href="forgot-password">Forgot Password?</a>
                    </div>
                    <button type="submit" className="login-box">Login</button>
                </form>
                <div className="login-register">
                    <h5>
                        New to Treasured Chest? <a href="create-Account" className="register-link">Create an account</a>
                    </h5>
                </div>
            </div>
        </div>
    );
};

export default Login;