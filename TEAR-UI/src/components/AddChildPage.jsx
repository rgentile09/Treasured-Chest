import React from "react";
import NewChildForm from "./NewChildForm";
import Quote from "./Quote";

export const AddChildPage = ({ addChild }) => {
  return (
    <div className="wrapper">
      <div className="section informational" id="destination">
        <Quote />
      </div>
      <div className="section form">
        <NewChildForm addChild={addChild} />
      </div>
    </div>
  );
};