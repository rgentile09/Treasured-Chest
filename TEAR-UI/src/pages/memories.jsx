// Add memories form

import React from "react";
import MemoryPostForm from "../components/MemoryPostForm";
 
const Memories = () => {
    return <div className="wrapper">
        <div className="form-page">
            <h1 className="mb-3">Create Memory Form</h1>
            <MemoryPostForm></MemoryPostForm>
        </div>
    </div>
};
 
export default Memories;