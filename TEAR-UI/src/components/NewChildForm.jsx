import React, { useState } from 'react';
import { addChild } from '../services/childService';

function NewChildForm() {
    const [firstName, setFirstName] = useState('');
    const [birthDate, setBirthDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addChild({ firstName, birthDate });
            setFirstName('');
            setBirthDate('');
            alert('Child added successfully!');
        } catch (error) {
            console.error('Error adding child:', error);
            alert('Failed to add child.');
        }
    };

    return (
        <div className="mt-5">
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                    <label className="form-label">First Name
                    <input 
                        type="text" 
                        className="form-control"
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                    </label>
                </div>
                <div className="mb-3">
                    <label className="form-label">Birth Date
                    <input 
                        type="date" 
                        value={birthDate} 
                        onChange={(e) => setBirthDate(e.target.value)} 
                        required 
                    />
                    </label>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Add Child</button>
            </form>
        </div>
    );
}

export default NewChildForm;
