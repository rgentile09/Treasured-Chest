import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MemoryCard } from "./MemoryCard";

export const MemoryTable = ({ memories, deleteMemory, searchMemory}) => {
  const memoriesList = memories; 
  const [memoriesItem, setMemoriesItem] = useState(memoriesList);
  const [searchQuery, setSearchQuery] = useState("");
  function handleSearchClick() {
      if (searchQuery === "") { setMemoriesItem(memoriesList); return; }
      const filterBySearch = memoriesList.filter((item) => {
          if (item.title.toLowerCase()
              .includes(searchQuery.toLowerCase())) { return item; }
      })
      setMemoriesItem(filterBySearch);
  }


  return (
      <div>
          <div>
          <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Search</span>
              </div>
              <input onChange={e => setSearchQuery(e.target.value)}></input>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" onClick={handleSearchClick}>Submit</button>
              </div>
          </div>
              
          </div>
          <div className="row">
            {memoriesItem.map((memory) => (
              <MemoryCard key={memory.id} memory={memory} deleteMemory={deleteMemory} />
            ))}
          </div>
      </div>
  );
};


