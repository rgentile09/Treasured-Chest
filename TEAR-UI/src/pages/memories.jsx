import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
 
function Memories({ setMemoryPost }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const memoryPost = {
            title,
            description,
            image: selectedFile ? URL.createObjectURL(selectedFile) : null,
        };
        setMemoryPost(memoryPost);
        navigate('/display');
    };

    return (
        <div className="wrapper">
            <div className="form-page">
            <h1 className="mb-3">Create Memory Form</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label" >Title:</label>
                        <input type="text" id="title" value={title} onChange={handleTitleChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="file">Upload Image:</label>
                        <input type="file" id="file" onChange={handleFileChange}  className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label" >Description:</label>
                        <textarea id="description" placeholder="Enter a description for the Memory" value={description} onChange={handleDescriptionChange} required style={{ display: 'block', marginBottom: '10px', width: '100%', height: '100px' }} />
                    </div>
                    <button type="submit" className="btn btn-success">Add Memory</button>
                </form>
            </div>
        </div>
    );
}
 
export default Memories;