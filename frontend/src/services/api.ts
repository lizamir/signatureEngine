import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTemplates = async () => {
  const response = await apiClient.get('/templates');
  return response.data;
};

export const generateSignature = async (
  templateId: string,
  userInfo: Record<string, string>
) => {
  const response = await apiClient.post('/generate', { templateId, userInfo });
  return response.data;
};

export const generateBulkSignatures = async (
  bulkData: Array<{ templateId: string; userInfo: Record<string, string> }>
) => {
  const response = await apiClient.post('/bulk-generate', bulkData);
  return response.data;
};

export default apiClient;
