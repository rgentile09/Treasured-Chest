import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Children({ setChild }) {
    const [firstName, setFirstName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [childPhoto, setChildPhoto] = useState('');
    const navigate = useNavigate();

    const handleNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleBirthDateChange = (event) => {
        setBirthDate(event.target.value);
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setChildPhoto(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const child = {
            firstName,
            birthDate,
            image: childPhoto ? URL.createObjectURL(childPhoto) : null,
        };
        setChild(child);
        navigate('/displayChildren');
    };

    return (
        <div className="wrapper">
            <div className="form-page">
            <form onSubmit={handleSubmit}>
                <label>First Name<br />
                    <input type="text" id="firstName" name="firstName"
                        value={firstName} onChange={handleNameChange} />
                </label><br />
                <label>Birthdate<br />
                    <input type="date" id="birthDate" name="birthDate"
                        value={birthDate} onChange={handleBirthDateChange} />
                </label><br />
                <label>Add a photo<br />
                    <input type="file" id="childPhoto" 
                        onChange={handlePhotoChange} />
                </label><br />
                <button type="submit" name="submitChild">Submit new Child for user</button><br />
            </form>
            </div>
        </div>
    );
}

export default Children;
