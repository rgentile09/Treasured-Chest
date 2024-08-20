import React, { useState, useEffect } from "react";
import { fetchChildren } from '../services/childService';

export const NewMemoryForm = ({ addMemory }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [isFirst, setIsFirst] = useState("");
    const [childId, setChildId] = useState("");
    const [children, setChildren] = useState([]);

    useEffect(() => {
      const loadChildren = async () => {
        try {
          const childrenData = await fetchChildren();
          setChildren(childrenData);
        } catch (error) {
          console.error("Error fetching children:", error);
        }
      };
      loadChildren();
    }, []);


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (description !== "" && title !== "" && file !== null) {
        const formData = new FormData();
        formData.append("description", description);
        formData.append("title", title);
        formData.append("file", file);
        formData.append("isFirst", isFirst);

        try {
          await addMemory(formData, childId);
          setTitle("");
          setDescription("");
          setFile(null);
          setIsFirst(false);
          setChildId('');
  
        } catch (error) {
          console.error("Error adding memory:", error);
          alert("Failed to add memory.");
        }
        } else {
          alert("Please fill out all fields before submitting.");
        }
    };
    

    return (
      <div className="section">
        <h2>Add a new memory</h2>
        <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              rows={3}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="file"
              placeholder="Upload an image"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />
            <label><input type="checkbox" checked={isFirst} onChange={(e) => setIsFirst(e.target.checked)}/> Mark as First</label>
            <label className="form-label">Select Child</label>
            <select 

              value={childId} 
              onChange={(e) => setChildId(e.target.value)} 
              required
            >
              <option value="">Select a child</option>
              {children.map(child => (
                <option key={child.id} value={child.id}>
                  {child.firstName}
                </option>
              ))}
            </select>
          <button type="submit" className="btn btn-primary mt-3">
            Add Memory
          </button>
        </form>
      </div>
    );
}; 

