import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const bookAppointment = (data, token) =>
  API.post('/appointments', data, { headers: { Authorization: `Bearer ${token}` } });
export const getAppointments = (token) =>
  API.get('/appointments', { headers: { Authorization: `Bearer ${token}` } });
export const updateAppointment = (id, status, token) =>
  API.put(`/appointments/${id}`, { status }, { headers: { Authorization: `Bearer ${token}` } });
