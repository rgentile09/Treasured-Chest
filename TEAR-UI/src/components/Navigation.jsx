import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ isLoggedIn, handleLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <Link className="navbar-brand" to="/">
                <div className="logo-link">
                    <img className="logo" src="src/assets/treasured-chest-logo.svg" alt="Logo" />
                    <h2>Treasured Chest</h2>
                </div>
            </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    {isLoggedIn ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/displayChildren">Children</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/memories">Add a Memory</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/memory">Memories</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/add-child">Add a Child</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/firsts">First Memories</Link>
                                </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/questionaire">Questionnaire</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/" onClick={handleLogout}>Logout</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create-account">Create Account</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>  
        </nav>
    );
}

export default Navigation;
