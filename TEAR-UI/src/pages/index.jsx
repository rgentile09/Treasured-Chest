import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [randomMemory, setRandomMemory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomMemory = async () => {
      setLoading(true); 
      try {
        const response = await axios.get('http://localhost:8080/api/memories/random', { withCredentials: true });
        setRandomMemory(response.data);
        setError(null); 
      } catch (error) {
        setError("Error fetching data.");
      } finally {
        setLoading(false); 
      }
    };

    fetchRandomMemory();
  }, []);

  if (loading) {
    return <p>Loading your random memory...</p>;
  }

  return (
    <div className="wrapper-vertical">
      <h1>Welcome to Treasured Chest!</h1>
      <h4>Here's one of your beautiful memories!</h4>
      <p>&nbsp;</p>
      {error && <div className="alert alert-danger">{error}</div>}
      {randomMemory ? (
        <div className="home-image-container">
          <img src={`http://localhost:8080${randomMemory.imageUrl}`} className="home-image" alt={randomMemory.title}/>
          <div className="card-body">
            <p>&nbsp;</p>
            <h4>{randomMemory.title}</h4>
            <p>{randomMemory.description}</p>
            <p>&nbsp;</p>
          </div>
        </div>
      ) : (
        !error && <p>No random memory found.</p>
      )}
    </div>
  );
};

export default Home;
