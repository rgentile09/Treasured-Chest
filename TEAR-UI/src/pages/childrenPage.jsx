import React, { useState, useEffect, Children } from "react";
import { fetchChildren, addChild } from "../services/childService";
export const TodoPage = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [error, setError] = useState(null);
    const [children, setChildren] = useState([]);
  
    useEffect(() => {
      const loadData = async () => {
        try {
          const childData = await fetchChildren();
          setMemories(childData);
        } catch (error) {
          setError("Error fetching data.");
        } finally {
          setLoading(false);
        }
      };
  
      loadData();
    }, [setChildren]);
  
    const handleAddChild = (formData) => {
      addChild(formData)
        .then((newChild) => {
          setTodos([...children, newChild]);
        })
        .catch((error) => {
          console.error("There was an error creating the Child!", error);
        });
    };
  
    const handleDeleteChild = (childId) => {
      deleteChild(childId)
        .then(() => {
          setChildren(children.filter((child) => child.id !== childId));
        })
        .catch((error) => {
          console.error("There was an error deleting the child!", error);
        });
    };
  
    return (
      <div className="mt-5 container">
        <div className="card">
          <div className="card-header">Children</div>
          <div className="card-body">
          {loading ? <p>Loading...</p> :<ChildTable children={children} deleteChild={handleDeleteChild} />}
           
           {error && <div className="alert alert-danger">{error}</div>}
           <div className="button-container">
           <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn btn-primary"
            >
              {showAddForm ? "Close Form" : "New Child"}
            </button>
            </div>
            {showAddForm && <childrenSubmitForm addChild={handleAddChild} />}
          </div>
        </div>
      </div>
    );
  };