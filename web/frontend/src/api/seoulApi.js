import axios from 'axios';

const BASE_URL = 'http://localhost:8080/seoul';

export const fetchCulturalEvents = async (pageIndex = 1, pageSize = 10) => {
    const response = await axios.get(`${BASE_URL}/cultural-events`, {
        params: { pageIndex, pageSize }
    });
    return response.data;
};
