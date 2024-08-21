const BASE_API_URL = 'http://localhost:8080/api/memories'; // Ensure this is the correct endpoint


export const fetchMemories = async () => {
  try {
    const response = await fetch(BASE_API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Use 'include' to ensure cookies are included in cross-origin requests
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse the response as JSON
    return data; // Return the fetched data
  } catch (error) {
    console.error('There was an error fetching the memories!', error);
    throw error;
  }
};

export const fetchMemoriesByChild = async (childId) => {
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
    // await axios.post(`${BASE_API_URL}/delete`, null, {
      await axios.post(`${BASE_API_URL}/delete`, null, {
      params: { memoryId },
      withCredentials: true, // Ensure credentials (cookies) are sent
    });
  } catch (error) {
    console.error('There was an error deleting the memory!', error);
    throw error;
  }
};

export const searchMemory = async (keyword) => {
  try {
    await axios.post(`${BASE_API_URL}/search`, null, {
      params: { keyword },
      withCredentials: true, // Ensure credentials (cookies) are sent
    });
  } catch (error) {
    console.error('There was an error searching for the memory!', error);
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

export const fetchFirsts = async () => {
  try {
      const response = await axios.get('http://localhost:8080/api/memories/firsts', {
          withCredentials: true,
      });
      return response.data;
  } catch (error) {
      console.error("There was an error fetching the first memories!", error);
      throw error;
  }
}; 




