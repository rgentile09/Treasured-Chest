// Where you can view any registered children (Aakash's child page example)

import React, { useState } from "react";


const Children = ({ addChild }) => {
    const [firstName, setFirstName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [childPhoto, setChildPhoto] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (firstName !== "" && birthDate !== "" && childPhoto != "") {
            
            addChild(firstName, birthDate, childPhoto);
            setFirstName("");
            setBirthDate("");
            setChildPhoto("");

    }
    };
    return (

        <form onSubmit={handleSubmit}>
            First Name<br />
            <input type="text" id="firstName" name="firstName"
                value={firstName} onChange={(e) => setFirstName(e.target.value)} required /><br />
            Birthdate<br />
            <input type="date" id="birthDate" name="birthDate"
                value={birthDate} onChange={(e) => setBirthDate(e.target.value)} required /><br />
            Add a photo<br />
            <input type="file" id="childPhoto" name="childPhoto"
                value={childPhoto} onChange={(e) => setChildPhoto(e.target.value)} required /><br />
            Submit new Child for user<input type="submit" name="submitChild"/><br />
        </form>

    )
};

export default Children;