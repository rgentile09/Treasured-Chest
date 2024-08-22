import React, { useState, useEffect } from 'react';
import QuestionnaireService from '../services/questionnaireService'; // Adjust the path as needed
import { fetchChildren } from '../services/childService';

function Questionnaire() {
  const [formData, setFormData] = useState({
    favoriteFood: '',
    vacation: '',
    growth: '',
    summary: '',
  });
  const [questionnaires, setQuestionnaires] = useState([]);
  const [childId, setChildId] = useState("");
  const [children, setChildren] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchQuestionnaires = async () => {
      try {
        const response = await QuestionnaireService.getAllQuestionnaires();
        setQuestionnaires(response);
        setError(null);
      } catch (error) {
        console.error('Error fetching questionnaires:', error);
        setError('Failed to load questionnaires.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionnaires();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await QuestionnaireService.addQuestionnaire(formData, childId);
      setQuestionnaires((prevQuestionnaires) => [
        ...prevQuestionnaires,
        response,
      ]);
      setFormData({
        favoriteFood: '',
        vacation: '',
        growth: '',
        summary: '',
      });
      setChildId("");
      setError(null);
    } catch (error) {
      console.error('Error adding questionnaire:', error);
      setError('Failed to submit questionnaire.');
    }
  };

  return (
    <div className="wrapper-vertical">
      <h1>Annual Questionnaire</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>What is their favorite food?</label>
          <input
            type="text"
            name="favoriteFood"
            value={formData.favoriteFood}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Did you take any vacations?</label>
          <input
            type="text"
            name="vacation"
            value={formData.vacation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>How many inches did the child grow this year?</label>
          <input
            type="text"
            name="growth"
            value={formData.growth}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>One word to sum up the year?</label>
          <input
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="form-label">Select Child</label>
          <select 
            className="form-control" 
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
        </div>
        <button type="submit">Submit</button>
      </form>
  
      <h1>Questionnaires</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {questionnaires.length > 0 ? (
            questionnaires.map((questionnaire) => (
              <li key={questionnaire.id}>
                {questionnaire.favoriteFood} {/* Adjust according to your data */}
              </li>
            ))
          ) : (
            <p>No questionnaires available.</p>
          )}
        </ul>
      )}
    </div>
  );
}

export default Questionnaire;




