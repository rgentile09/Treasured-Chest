// Login to existing account page

import React from "react";
 
const Login = () => {
    return <div className="wrapper">
        <div className="section informational">
            <h1>Storing your memories, made easy.</h1>
            <h4>From your child’s first steps to their last tooth, never lose track of the memories important to you.</h4>
            <p>Or, <a href="/create-account">create an account</a> if you don't have an account with us.</p>
        </div>
        <div className="section form">
            {/* Add React form component */}
            {/* <div className="form-container">
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
                 <button type="submit" className="btn btn-success">Submit Memory</button>
             </form>
         </div> */}
            <form> 
                <input type="text" id="title" placeholder="Title"></input>
                <input type="textarea" id="textarea" placeholder="Description"></input>
            </form>
            <p>***Login Form here***</p>
        </div>
    </div>;
};
 
export default Login;