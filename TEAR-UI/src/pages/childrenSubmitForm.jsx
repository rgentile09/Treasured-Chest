import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addChild } from "../services/childService";

function Children({ setChild }) {
    const [firstName, setFirstName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [file, setFile] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (firstName !== "" && birthDate !== "") {
            const formData = new FormData();
            formData.append("firstName", firstName);
            formData.append("birthDate", birthDate);
            formData.append("childPhoto", file);
        addChild(formData);
        setFirstName("");
        setBirthDate("");
        setFile(null);
        
        }
    };

    return (
        <div className="wrapper">
            <div className="form-page">
                <h1 className="mb-3">Create Child Form</h1>
                <form onSubmit={handleSubmit}>
                    <label>First Name<br />
                        <input type="text" id="firstName" name="firstName"
                            value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    </label><br />
                    <label>Birthdate<br />
                        <input type="date" id="birthDate" name="birthDate"
                            value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                    </label><br />
                    <label>Add a photo<br />
                        <input type="file" 
                            onChange={(e) => setFile(e.target.files[0])} />
                    </label><br />
                    <button type="submit" name="submitChild">Submit new Child for user</button><br />
                </form>
            </div>
        </div>
    );
}

export default Children;
