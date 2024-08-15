// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Quote from "../components/Quote";
 
// function Memories({ setMemoryPost }) {
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const navigate = useNavigate();

//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         setSelectedFile(file);
//     };

//     const handleTitleChange = (event) => {
//         setTitle(event.target.value);
//     };

//     const handleDescriptionChange = (event) => {
//         setDescription(event.target.value);
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();

//         const memoryPost = {
//             title,
//             description,
//             image: selectedFile ? URL.createObjectURL(selectedFile) : null,
//         };
//         setMemoryPost(memoryPost);
//         navigate('/');
//     };

//     return (
//         <div className="wrapper">
//             <div className="section informational" id="destination">
//                 <Quote />
//             </div>
//             <div className="section form">
//                 <h1 className="mb-3">Create Memory Form</h1>
//                 <form onSubmit={handleSubmit}>
//                     <input type="text" id="title" value={title} onChange={handleTitleChange} placeholder="Title"/>
//                     <input type="file" id="file" onChange={handleFileChange} placeholder="Upload Image"/>
//                     <textarea id="description" placeholder="Enter a description for the Memory" value={description} onChange={handleDescriptionChange} required style={{ display: 'block', marginBottom: '10px', width: '100%', height: '100px' }}/>
//                     <button type="submit" className="btn btn-success">Add Memory</button>
//                 </form>
//             </div>
//         </div>
//     );
// }
 
// export default Memories;