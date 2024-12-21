import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTemplates = async () => {
  const response = await apiClient.get('/templates');
  return response.data;
};
