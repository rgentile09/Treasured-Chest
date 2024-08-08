import React from 'react';

function DisplayMemory({ memoryPost }) {
    if (!memoryPost) {
        return <div className="wrapper">
            <div className="form-page">
                <p>No memory available. Please <a className="dark" href="/memories">add your first memory</a>.</p>
            </div>
        </div>;
    }

    return (
        <div className="wrapper">
            <div className="form-page">
                <h3 className="mb-3">{memoryPost.title}</h3>
                <img src={memoryPost.image} alt="Uploaded" style={{ maxWidth: '20vw', height: 'auto' }} />
                <p>{memoryPost.description}</p>
            </div>
        </div>
    );
}

export default DisplayMemory;