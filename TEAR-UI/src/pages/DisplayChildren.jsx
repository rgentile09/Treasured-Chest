import React from 'react';

function DisplayChildren({ child }) {
    if (!child) {
        return <div className="wrapper">
            <div className="form-page">
                <p>No children available. Please <a className="dark" href="/children">add your first child</a>.</p>
            </div>
        </div>;
    }

    return (
        <div className="wrapper">
            <h3 className="mb-3">{child.firstName}</h3>
            <img src={child.image} alt="Uploaded" style={{ maxWidth: '20vw', height: 'auto' }} />
        </div>
    );
}

export default DisplayChildren;