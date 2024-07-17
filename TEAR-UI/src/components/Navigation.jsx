import React from "react";

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">

            <a className="navbar-brand" href="/">Treasured Chest</a>
            
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/memories">Memories</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/children">Children</a>
                    </li>
                </ul>
            </div>
        </nav>
        
    )
}

export default Navigation