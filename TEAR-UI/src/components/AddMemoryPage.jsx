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
      <NewMemoryForm addMemory={addMemory} />
    </div>
  );
};
