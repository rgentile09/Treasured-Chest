import React, { useState } from "react";
import axios from "axios";

function Login ({ setAuthenticated })  {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        // Add your login logic here
        try {
            if (!username || !email) {
                throw new Error('Please provide a username or email.');
                
}

            const response = await axios.post("http:/localhost:3306/user/login", {
                username,
                email,
              password
            }, 
        {
            withCredentials: true,
         });

           setAuthenticated(true);
           setMessage(error.response.data);
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed. Please try again.");

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
                    <input type="text" value={username} 
                    onChange={(e)=> setUsername(e.target.value)}
                    placeholder="Username"
                    />
                    <input type="email" value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder="Email"
                    /> 
                         <input
                            type={passwordVisible ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" required
                        />
                      <button type="submit">Login</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>

       );
}

export default Login;