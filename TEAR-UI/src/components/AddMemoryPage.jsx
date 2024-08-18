import React from "react";
import { NewMemoryForm } from "./NewMemoryForm";
import { useNavigate } from "react-router-dom";

export const AddMemoryPage = ({ addMemory }) => {

  return (
    <div className="mt-5 container">
      <div className="card">
        <div className="card-header">Add a New Memory</div>
        <div className="card-body">
          <NewMemoryForm addMemory={addMemory} />
        </div>
      </div>
    </div>
  );
};
