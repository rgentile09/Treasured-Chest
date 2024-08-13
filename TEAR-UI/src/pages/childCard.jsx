import React from "react";
import { useNavigate } from "react-router-dom";

export const ChildCard = ({ child, deleteChild }) => {
  const navigate = useNavigate();
  const imagePath = `http://localhost:8080${child.childPhoto}`;

  return (
    <div className="col-md-4 mb-4" onClick={() => navigate(`/child/${child.id}`)}>
      <div className="card">
        <img src={imagePath} className="card-img-top" alt={child.firstName} />
        <div className="card-body">
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
    </div>
  );
};