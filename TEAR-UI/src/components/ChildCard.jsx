import React from "react";
import { useNavigate } from "react-router-dom";

export const ChildCard = ({ child, deleteChild }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/children/${child.id}`)}>
        <div className="child">
          <h5 className="card-title">{child.firstName}</h5>
          <p className="card-text">{child.birthDate}</p>
          <button
            className="btn btn-danger"
            onClick={(e) => {
              e.stopPropagation();
              deleteChild(child.id);
            }}
          >
            Delete
          </button>
        </div>
      </div>
  );
};