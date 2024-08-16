import React from "react";
import { useParams } from "react-router-dom";

const MemoryDetail = ({ memories }) => {
  const { memoryId } = useParams();
  const memory = memories.find((m) => m.id === parseInt(memoryId));

  if (!memory) {
    return <div>Memory not found</div>;
  }

  const imagePath = `http://localhost:8080${memory.imageUrl}`;

  return (
    <div className="container mt-5">
      <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
        <h5 className="card-title centered-title mb-5" style={{ fontSize: '5rem', marginBottom: '20px' }}>{memory.title}</h5>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img 
              src={imagePath} 
              className="card-img-top" 
              alt={memory.title} 
              style={{ width: '20vw', height: 'auto' }} 
            />
        </div>
        <p className="card-text centered-text mt-5" style={{ fontSize: '2rem', marginTop: '20px'  }}>{memory.description}</p>
      </div>
    </div>
  );
};

export default MemoryDetail;