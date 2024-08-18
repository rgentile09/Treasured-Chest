import React, { useState, useEffect } from "react";
import { fetchChildren, deleteChild } from "../services/childService";
import ChildTable from "../components/ChildTable";

const ChildrenPage = ({ children, setChildren }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const childrenData = await fetchChildren();
        setChildren(childrenData);
      } catch (error) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setChildren]);

  const handleDeleteChild = (childId) => {
    deleteChild(childId)
      .then(() => {
        setChildren(children.filter((child) => child.id !== childId));
        setError(null);
      })
      .catch(() => {
        setError("There was an error deleting the child!");
      });
  };

  return (
    <div className="mt-5 container">
      <div className="card">
        <div className="card-header">Your Children</div>
        <div className="card-body">
          {loading ? <p>Loading...</p> : <ChildTable children={children} deleteChild={handleDeleteChild} />}
          {error && <div className="alert alert-danger">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default ChildrenPage;

