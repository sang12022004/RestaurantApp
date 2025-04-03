import axios from 'axios';

// Tạo một  axios
const apiClient = axios.create({
  baseURL: 'https://67241832493fac3cf24d1d33.mockapi.io/0306221306/VanNamCao/menu',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Lấy menu của một nhà hàng dựa trên ID
export const getMenuById = async (id) => {
  try {
    const response = await apiClient.get(`?${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching menu for restaurant id ${id}:`, error);
    throw error;
  }
};

