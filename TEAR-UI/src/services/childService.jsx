import axios from 'axios';

const BASE_API_URL = 'http://localhost:8080/api/children';
export const fetchChildren = async () => {
    try {
        const response = await axios.get(BASE_API_URL, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching children: ' + error.message);
    }
};

export const addChild = async (child) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/new`, child, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error adding child: ' + error.message);
    }
};

export const deleteChild = async (childId) => {
    try {
        const response = await axios.post(`${BASE_API_URL}/delete`, { childId }, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        throw new Error('Error deleting child: ' + error.message);
    }
};

