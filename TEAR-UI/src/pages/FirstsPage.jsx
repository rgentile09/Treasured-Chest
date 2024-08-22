import React, { useEffect, useState } from 'react';
import { fetchFirsts } from '../services/memoryService'; 
import { useNavigate } from "react-router-dom";

const FirstsPage = () => {
  const [firsts, setFirsts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadFirsts = async () => {
      try {
        const data = await fetchFirsts();
        setFirsts(data);
      } catch (error) {
        console.error("Failed to load firsts:", error);
      }
    };

    loadFirsts();
  }, []);

  return (
    <div className="container mt-5">
      <h2>First Memories</h2>
      <div className="row">
        {firsts.map(first => (
          <div key={first.id} className="col-md-4 mb-4" onClick={() => navigate(`/memory/${first.id}`)}>
            <div className="card">
              <img src={`http://localhost:8080${first.imageUrl}`} className="card-img-top" alt={first.title} />
              <div className="card-body">
                <h5 className="card-title">{first.title}</h5>
                <p className="card-text">{first.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstsPage;