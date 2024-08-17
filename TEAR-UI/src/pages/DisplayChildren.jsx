import React from 'react';
import { Link } from 'react-router-dom';

function DisplayChild({ child }) {
    if (!child) {
        return (
            <div className="wrapper">
                <div className="form-page">
                    <p>No child available. Please <Link className="dark" to="/add-child">add your first child</Link>.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="wrapper">
            <div className="form-page">
                <h3 className="mb-3">{child.firstName}</h3>
                <p>Date of Birth: {child.birthDate}</p>
                {/* Add more child-related information here if needed */}
            </div>
        </div>
    );
}

export default DisplayChild;

