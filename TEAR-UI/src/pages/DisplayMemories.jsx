import React from 'react';
import { Link } from 'react-router-dom';

function DisplayMemory({ memoryPost }) {
    if (!memoryPost) {
        return <div className="wrapper">
            <div className="form-page">
                 <p>No memory available. Please <Link className="dark" to="/memories">add your first memory</Link>.</p>
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

