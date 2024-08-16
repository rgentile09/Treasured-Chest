import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080/api/memories';

export const fetchComments = async (memoryId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/${memoryId}/comments`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching comments!", error);
    throw error;
  }
};

export const addComment = async (memoryId, text) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/${memoryId}/comments`, 
    new URLSearchParams({
      memoryId: memoryId,
      text: text
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("There was an error adding the comment!", error);
    throw error;
  }
};

export const deleteComment = async (memoryId, commentId) => {
    try {
      const response = await axios.post(`${BASE_API_URL}/${memoryId}/comments/delete`, null, {
        params: { commentId },
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("There was an error deleting the comment!", error);
      throw error;
    }
  };