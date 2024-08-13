import React, { createContext, useContext, useState } from "react";

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to wrap around parts of the app that need access to auth state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        const response = await fetch("http://localhost:5173/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data.user); // Assuming the API returns a user object
            localStorage.setItem("authtoken", data.token); // Store the token in localStorage
            return true;
        } else {
            return false;
        }
    };

    const register = async (registerFormDTO) => {
        const response = await fetch("http://localhost:3306/api/create-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerFormDTO),
        });

        if (response.ok) {
            const data = await response.json();
            setUser(data.user); // Assuming the API returns a user object
            localStorage.setItem("authtoken", data.token); // Store the token in localStorage
            return true;
        } else {
            return false;
        }
    };

    const logout = async () => {
        await fetch("http://localhost:3306/api/logout", {
            method: "GET",
        });
        setUser(null);
        localStorage.removeItem("authtoken");
    };

    const value = {
        user,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};