import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "content-type": "application/json",
  },
});

export const getSignatureTemplates = async () => {
  const response = await apiClient.get("/templates");
  return response.data;
};

export const generateSignature = async (
  templateId: string,
  userInfo: Record<string, string>
) => {
  const data = { templateId, userInfo };
  const response = await apiClient.post("/generate", data);
  return response.data;
};

export const generateBulkSignatures = async (
  bulkData: Array<{ templateId: string; userInfo: Record<string, string> }>
) => {
  const response = await apiClient.post("/bulk-generate", bulkData);
  return response.data;
};

export default apiClient;
