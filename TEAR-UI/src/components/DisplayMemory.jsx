import React from 'react';

function DisplayMemory({ memoryPost }) {
    if (!memoryPost) {
        return <p>No Memory available. Please upload a Memory first.</p>;
    }

    return (
        <div className="display-container">
            <h3 className="mb-3">{memoryPost.title}</h3>
            <img src={memoryPost.image} alt="Uploaded" style={{ maxWidth: '20vw', height: 'auto' }} />
            <p>{memoryPost.description}</p>
        </div>
    );
}

export default DisplayMemory;