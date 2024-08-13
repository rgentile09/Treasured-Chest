import React, { useState, useEffect, Children } from "react";
import { fetchChildren, addChild } from "../services/childService";
export const TodoPage = () => {
    const [showAddForm, setShowAddForm] = useState(false);
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
  
    const handleAddChild = (firstName, birthDate, childPhoto) => {
      addChild(firstName, birthDate, childPhoto)
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
          setTodos(children.filter((child) => child.id !== childId));
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
            {/* <ChildTable children={children} deleteChild={handleDeleteChild} /> */}
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="btn btn-primary"
            >
              {showAddForm ? "Close Form" : "New Todo"}
            </button>
            {showAddForm && <childrenSubmitForm setChild={handleAddChild} />}
          </div>
        </div>
      </div>
    );
  };