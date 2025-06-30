// lib/api.ts
import axios from "axios";

export const BASE_URL = "https://app.bewriter.uz/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
});

// Helper to get token from storage (can be updated to use cookies if needed)
api.interceptors.request.use((config) => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUwNzExMDQzLCJpYXQiOjE3NTA3MDc0NDMsImp0aSI6IjYzMDE0NTY4ZTUyNDRlYzA4MzRmNTk4ODZjYzVjY2UyIiwidXNlcl9pZCI6MX0.sszf3e7lnsRlUiMeY6dxpGBmMX-8upziOFG_2TCzTVE";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const crud = {
  loadAll: async (resource: string) => {
    const response = await api.get(`/${resource}`, {});
    return response.data;
  },

  loadAllById: async (resource: string, id: string | number) => {
    console.log(`Loading all items for resource: ${resource} with ID: ${id}`);
    const response = await api.get(`/${resource}/${id}`, {});
    return response.data;
  },

  create: async (resource: string, data: any) => {
    const response = await api.post(`/${resource}`, data, {});
    return response.data;
  },
};
