import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080/api/memories';

export const fetchMemories = async (childId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/memories/child/${childId}`, {
      credentials: 'include', // Include credentials (cookies)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was an error fetching the memories!', error);
    throw error;
  }
};

export const addMemory = async (formData, childId) => {
  try {
    const response = await fetch(`http://localhost:8080/api/memories/child/${childId}/new`, {
      method: 'POST',
      body: formData,
      credentials: 'include', // Include credentials (cookies)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('There was an error creating the memory!', error);
    throw error;
  }
};


export const deleteMemory = async (memoryId) => {
  try {
    await axios.post(`${BASE_API_URL}/delete`, null, {
      params: { memoryId },
      withCredentials: true, // Ensure credentials (cookies) are sent
    });
  } catch (error) {
    console.error('There was an error deleting the memory!', error);
    throw error;
  }
};

export const memoryPost = async (memory) => {
  try {
    const response = await fetch(`http://localhost:8080/api/memories/child/${childId}/new`,  {
      method: 'POST',
      body: memory, // assuming memory is a FormData object
      credentials: 'include', // include credentials for session handling
    });
    if (!response.ok) {
      const errorText = await response.text(); // Capture the response text
      console.error("Backend error response:", errorText); // Log the response
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error("Error adding memory:", error);
    throw error;
  }
};




