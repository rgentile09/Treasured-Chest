import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [randomMemory, setRandomMemory] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomMemory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/memories/random', { withCredentials: true });
          setRandomMemory(response.data);
        } catch (error) {
            setError("Error fetching data.");
          } finally {
            setLoading(false);
          }
    };

    fetchRandomMemory();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Welcome to Your Memory App</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {randomMemory ? (
        <div className="card mt-4">
            <label>One of your beautiful memories!</label>
          <img src={`http://localhost:8080${randomMemory.imageUrl}`} className="card-img-top" alt={randomMemory.title} />
          <div className="card-body">
            <h5 className="card-title">{randomMemory.title}</h5>
            <p className="card-text">{randomMemory.description}</p>
          </div>
        </div>
      ) : (
        !error && <p>Loading your random memory...</p>
      )}
    </div>
  );
};

export default Home;