import React from 'react';

function ChildDetail({ child }) {
    return (
        <div>
            <h2>{child.firstName}</h2>
            <p>Date of Birth: {child.birthDate}</p>
        </div>
    );
}

export default ChildDetail;