import React from "react";
import NewChildForm  from "./NewChildForm";

export const AddChildPage = ({ addChild }) => {
  return (
    <div className="mt-5 container">
      <div className="card">
        <div className="card-header">Add a New Memory</div>
        <div className="card-body">
          <NewChildForm addChild={addChild} />
        </div>
      </div>
    </div>
  );
};