import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (data) => api.post('/auth/login', data);
export const register = (data) => api.post('/auth/register', data);
export const addBook = (data) => api.post('/books', data);
export const getBooks = (params = {}) => api.get('/books', { params }); // Accept params for query filtering
export const borrowBook = (id) => api.put(`/books/${id}/borrow`);
export const returnBook = (id) => api.put(`/books/${id}/return`);
export const updateBook = (id, data) => api.put(`/books/${id}`, data);
export const deleteBook = (id) => api.delete(`/books/${id}`);