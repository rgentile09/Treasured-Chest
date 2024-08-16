import React from "react";
import { MemoryCard } from "./MemoryCard";

export const MemoryTable = ({ memories, deleteMemory }) => {
  return (
    <div className="container">
      <div className="row">
        {memories.map((memory) => (
          <MemoryCard key={memory.id} memory={memory} deleteMemory={deleteMemory} />
        ))}
      </div>
    </div>
  );
};
