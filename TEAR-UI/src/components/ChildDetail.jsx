import React, { useEffect, useState } from 'react';
import { fetchMemoriesByChild, deleteMemory, searchMemory} from "../services/memoryService";
import { MemoryTable } from "../components/MemoryTable";
import { useParams } from "react-router-dom";

const ChildDetail = ({ children }) => {
  const { childId } = useParams();
  const child = children.find((c) => c.id === parseInt(childId));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [memories, setMemories] = useState("");

 useEffect(() => {
  const loadData = async () => {
    try {
      const memoriesData = await fetchMemoriesByChild(childId);
      setMemories(memoriesData);
    } catch (error) {
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  loadData();
}, [childId, setMemories]);

const handleDeleteMemory = (memoryId) => {
  deleteMemory(memoryId)
    .then(() => {
      setMemories(memories.filter((memory) => memory.id !== memoryId));
      setError(null);
    })
    .catch(() => {
      setError("There was an error deleting the memory!");
    });
};

const handleSearchMemory = (keyword) => {
  searchMemory(keyword)
    .then(() => {
      setMemories(memories.filter((memory) => memory.title !== keyword));
      setError(null);
    })
    .catch(() => {
      // setError("There was an error deleting the memory!");
    });
};

  if (!child) {
    return (
    <div>Child not found</div>
    );
  }

  return (
    <div className="wrapper-vertical">
    <div className="container mt-5">
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>
          {child.firstName}
        </h1>
        <h3 className="card-text centered-text mt-5" style={{ marginTop: '10px' }}>
          Date of Birth: {child.birthDate}
        </h3>
      </div>
    </div>
  <div className="mt-5 container">
    <div className="card">
      <div className="card-header">Your Memories</div>
      <div className="card-body">
        {loading ? <p>Loading...</p> : <MemoryTable memories={memories} deleteMemory={handleDeleteMemory} searchMemory={handleSearchMemory} />}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  </div>
  </div>
  );
};

export default ChildDetail;
