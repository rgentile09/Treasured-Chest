// Form page to create account

import React from "react";
 
const CreateAccount = () => {
    return <div className="wrapper">
        <div className="section informational">
            <h1>We're glad you're here.</h1>
            <h4>Sign up and get started for free!</h4>
            <p>Or, <a href="/login">Login</a> if you already have an account.</p>
        </div>
        <div className="section form">
            {/* Add React form component */}
            <p>***Form here***</p>
        </div>
    </div>;
};
 
export default CreateAccount;