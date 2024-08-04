import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    return <div className="wrapper">
        <div className="section informational">
            <h1>Storing your memories, made easy.</h1>
            <h4>From your child’s first steps to their last tooth, never lose track of the memories important to you.</h4>
            <p>Or, <a href="/create-account">create an account</a> if you don't have an account with us.</p>
        </div>
        <div className="section form">
            {/* Add React form component */}
            <p>***Login Form here***</p>
        </div>
    );};


export default Login;