import React from 'react';

function DisplayChildren({ child }) {
    if (!child) {
        return <p>No Children available. Please add your first child.</p>;
    }

    return (
        <div className="display-container">
            <h3 className="mb-3">{child.firstName}</h3>
            <img src={child.image} alt="Uploaded" style={{ maxWidth: '20vw', height: 'auto' }} />
        </div>
    );
}

export default DisplayChildren;