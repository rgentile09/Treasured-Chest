import axios from "axios";

const BASEAPIURL = "http://localhost:8080";

export const fetchChildren = async () => {
  try {
    const response = await axios.get(`${BASEAPIURL}/api/children`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the children!", error);
    throw error;
  }
};

export const addChild = async (formData) => {
  try {
    const response = await axios.post(`${BASEAPIURL}/api/children/add`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
       },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error creating the child!", error);
    throw error;
  }
};

// export const deleteChild = async (userId) => {
//   try {
//     await axios.post(`${BASEAPIURL}/api/user/delete`, null, {
//       params: { userId },
//     });
//   } catch (error) {
//     console.error("There was an error deleting the child!", error);
//     throw error;
//   }
// };
