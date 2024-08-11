import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        verifyPassword: ""
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Add your validation logic here
        try {
            const response = await axios.post("http://localhost:8080/user/create-account", 
                {
                    username: form.username,
                    password: form.password,
                    firstName: form.firstName,
                    lastName: form.lastName,
                    email: form.email,
                },
                {
                    withCredentials: true,
                } 
            );
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed");    
        }
    };

    return (
        <div className="wrapper">
            <div className="section informational">
                <h1>We're glad you're here.</h1>
                <h4>Sign up and get started for free!</h4>
                <p>Or, <a href="/login">Login</a> if you already have an account.</p>
            </div>
            <div className="section form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>First Name
                            <input
                                className="form-control"
                                name="firstName"
                                value={form.firstName}
                                onChange={handleChange}
                            />
                        </label>
                        {errors.firstName && <p className="error">{errors.firstName}</p>}
                    </div>
                    <div className="form-group">
                        <label>Last Name
                            <input
                                className="form-control"
                                name="lastName"
                                value={form.lastName}
                                onChange={handleChange}
                            />
                        </label>
                        {errors.lastName && <p className="error">{errors.lastName}</p>}
                    </div>
                    <div className="form-group">
                        <label>Email
                            <input
                                className="form-control"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </label>
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="form-group">
                        <label>Username
                            <input
                                className="form-control"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                            />
                        </label>
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>
                    <div className="form-group">
                        <label>Password
                            <input
                                className="form-control"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </label>
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <div className="form-group">
                        <label>Verify Password
                            <input
                                className="form-control"
                                name="verifyPassword"
                                type="password"
                                value={form.verifyPassword}
                                onChange={handleChange}
                            />
                        </label>
                        {errors.verifyPassword && <p className="error">{errors.verifyPassword}</p>}
                    </div>
                    <input type="submit" className="btn btn-primary" value="Create Account" />
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default CreateAccount;