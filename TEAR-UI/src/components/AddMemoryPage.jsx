import React from "react";
import { NewMemoryForm } from "./NewMemoryForm";
import Quote from "./Quote";
import { useNavigate } from "react-router-dom";

export const AddMemoryPage = ({ addMemory }) => {

  return (
    <div className="wrapper">
      <div className="section informational" id="destination">
        <Quote />
      </div>
      <div className="section form">
        <div className="card">
          <div className="card-header">Add a New Memory</div>
          <div className="card-body">
            <NewMemoryForm addMemory={addMemory} />
          </div>
        </div>
      </div>
    </div>
  );
};
