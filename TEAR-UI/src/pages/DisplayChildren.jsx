import React from 'react';
import { Link } from 'react-router-dom';

function DisplayChildren({ child }) {
    if (!child) {
        return <div className="wrapper">
            <div className="form-page">
            <p>No children available. Please <Link className="dark" to="/children">add your first child.</Link></p>
            </div>
        </div>;
    }

    return (
        <div className="wrapper">
            <h3 className="mb-3">{child.firstName}</h3>
            <img src={child.childPhoto} alt="Uploaded" style={{ maxWidth: '20vw', height: 'auto' }} />
        </div>
    );
}

export default DisplayChildren;