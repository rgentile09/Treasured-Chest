import React from "react";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            
            <a className="navbar-brand" href="/">
                <div className="logo-link">
                    <img className="logo" src="src/assets/treasured-chest-logo.svg"></img>
                    <h2>Treasured Chest</h2>
                </div>
            </a>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/memories">Memories</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/children">Children</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/create-account">Create Account</a>
                    </li>
                </ul>
            </div>  

            <div className="hamburger">
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </div>
        </nav>
        
    )
}

export default Navigation