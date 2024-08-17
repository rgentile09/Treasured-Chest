import React, { useState, useEffect } from "react";
import { fetchMemories, deleteMemory, searchMemory} from "../services/memoryService";
import { MemoryTable } from "../components/MemoryTable";
import { Search } from "../components/Search";

const MemoryPage = ({ memories, setMemories }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const memoriesData = await fetchMemories();
        setMemories(memoriesData);
      } catch (error) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setMemories]);

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

  return (
    <div className="mt-5 container">
      <div className="card">
        <div className="card-header">Your Memories</div>
        <div className="card-body">
          {loading ? <p>Loading...</p> : <MemoryTable memories={memories} deleteMemory={handleDeleteMemory} searchMemory={handleSearchMemory} />}
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default MemoryPage;