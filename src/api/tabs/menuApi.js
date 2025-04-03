import axios from 'axios';

// Tạo một instance của axios
const apiClient = axios.create({
  baseURL: 'https://67e2715d97fc65f535361af7.mockapi.io/api/tabs/Menu_Restaurent',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lấy menu của một nhà hàng dựa trên ID
export const getMenuById = async (id) => {
  try {
    const response = await apiClient.get(`?id=${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu for restaurant id ${id}:`, error.response?.data || error.message);
    throw error;
  }
};
