import React, { useState } from "react";
import { MemoryCard } from "./MemoryCard";

export const MemoryTable = ({ memories, deleteMemory, searchMemory}) => {
  const [searchQuery, setSearchQuery] = useState("");

    const onSearchSubmit = (e) => {
        e.preventDefault();
        searchMemory(searchQuery);
        // navigate("/");
    };

  return (
    <div className="container">
      <form onSubmit={onSearchSubmit}>
          <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Search</span>
              </div>
              <input type="text" className="form-control" placeholder="Enter a keyword (i.e. tooth, Christmas, etc.)" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="submit">Submit</button>
              </div>
          </div>
      </form>
      <div className="row">
        {memories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} deleteMemory={deleteMemory} />
        ))}
      </div>
    </div>
  );
};


