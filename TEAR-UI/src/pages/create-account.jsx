import React, { useState } from "react";
import {useNavigate} from "react-router-dom";


const CreateAccount = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        verifyPassword: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    const validateForm = () => {
        const newErrors = {};
     
        if (form.firstName.length < 1 || form.firstName.length > 30) {
            newErrors.firstName = "First name must be between 1 and 30 characters.";
        }
        if (form.lastName.length < 1 || form.lastName.length > 30) {
            newErrors.lastName = "Last name must be between 1 and 30 characters.";
        }
        if (form.email.length < 5 || form.email.length > 50) {
            newErrors.email = "Email must be between 5 and 50 characters.";
        }
        if (form.password.length < 5 || form.password.length > 30) {
            newErrors.password = "Password must be between 5 and 30 characters.";
        }
        if (form.password !== form.verifyPassword) {
            newErrors.verifyPassword = "Passwords do not match.";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
        } else {
            setErrors({});
            // Submit form data to the server
            try {
                const response = await fetch("/api/create-account", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                });
                if (response.ok) {
                    console.log("Form submitted successfully");
                    navigate("/login");
                    // Handle successful form submission (e.g., redirect to login page)
                } else {
                    const errorData = await response.json();
                    setErrors(errorData.errors);
                    console.error("Form submission failed");
                    // Handle form submission failure
                }
            } catch (error) {
                console.error("Error during form submission: ", error);
                setErrors({general:" An error occured. Please try again."});
                // Handle error during form submission
            }
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
            </div>
        </div>
    );
};

export default CreateAccount;