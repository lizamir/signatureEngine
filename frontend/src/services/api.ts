import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
// Fetch templates from the backend

export const getTemplates = async () => {
  const response = await apiClient.get('/templates');
  return response.data;
};
// Generate a single email signature

export const generateSignature = async (
  templateId: string,
  userInfo: { name: string; email: string; phone: string }
) => {
  const response = await apiClient.post('/generate', {
    templateVersion: templateId,
    ...userInfo,
  });
  return response.data;
};

export const generateBulkSignatures = async (
  bulkData: Array<{ templateId: string; userInfo: Record<string, string> }>
) => {
  const response = await apiClient.post('/bulk-generate', bulkData);
  return response.data;
};

export default apiClient;
