import React, { useState, useEffect } from "react";
import { fetchChildren } from '../services/childService';
import { updateMemory, fetchMemoryById } from '../services/memoryService'; 
import { useNavigate, useParams } from "react-router-dom";

export const UpdateMemoryForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [isFirst, setIsFirst] = useState(false);
    const [childId, setChildId] = useState("");
    const [children, setChildren] = useState([]);
    const { memoryId } = useParams(); 
    const navigate = useNavigate(); 
    
    useEffect(() => {
        const loadMemory = async () => {
            try {
                const memory = await fetchMemoryById(memoryId);
                setTitle(memory.title);
                setDescription(memory.description);
                setIsFirst(memory.isFirst);
                setChildId(memory.childId); 
            } catch (error) {
                console.error("Error fetching memory:", error);
            }
        };

        const loadChildren = async () => {
            try {
                const childrenData = await fetchChildren();
                setChildren(childrenData);
            } catch (error) {
                console.error("Error fetching children:", error);
            }
        };

        loadMemory();
        loadChildren();
    }, [memoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        if (description !== "") formData.append("description", description);
        if (title !== "") formData.append("title", title);
        if (file) formData.append("file", file);
        formData.append("isFirst", isFirst);

        try {
            await updateMemory(formData, childId, memoryId);
            navigate('/memories');
        } catch (error) {
            console.error("Error updating memory:", error);
            alert("Failed to update memory.");
        }
    };

    return (
        <div className="section">
            <h2>Update Memory</h2>
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
                    placeholder="Upload a new image"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <label className="checkbox-inline">
                    <input 
                        type="checkbox" 
                        checked={isFirst} 
                        onChange={(e) => setIsFirst(e.target.checked)}
                    /> Mark as First
                </label>
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
                    Update Memory
                </button>
            </form>
        </div>
    );
};
