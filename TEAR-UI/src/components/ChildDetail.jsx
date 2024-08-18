import React from 'react';

import { useParams } from "react-router-dom";

const ChildDetail = ({ children }) => {
  const { childId } = useParams();
  const child = children.find((c) => c.id === parseInt(childId));
 ;

  if (!child) {
    return <div>Child not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
        <h5 className="card-title centered-title mb-5" style={{ fontSize: '5rem', marginBottom: '20px' }}>
          {child.firstName}
        </h5>
        <p className="card-text centered-text mt-5" style={{ fontSize: '2rem', marginTop: '20px' }}>
          Date of Birth: {child.birthDate}
        </p>
      </div>
    </div>
  );
};

export default ChildDetail;