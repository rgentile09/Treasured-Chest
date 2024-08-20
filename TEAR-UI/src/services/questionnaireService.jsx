const BASE_URL = 'http://localhost:8080/api/questionnaires';

// Function to get all questionnaires
const getAllQuestionnaires = async () => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Ensure this matches with your server settings
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching questionnaires:', error);
    throw error; // Rethrow the error so the caller can handle it
  }
};

// Function to add a new questionnaire
const addQuestionnaire = async (questionnaire, childId) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...questionnaire,
        child: { id: childId } // Include the childId in the request body as part of the child object
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding questionnaire:', error);
    throw error;
  }
};

export default { getAllQuestionnaires, addQuestionnaire };



