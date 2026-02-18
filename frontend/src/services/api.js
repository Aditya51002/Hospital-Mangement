import axios from 'axios'

const API = axios.create({ baseURL: '/api' })

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('hms_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auth
export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)

// Appointments
export const bookAppointment = (data) => API.post('/appointments', data)
export const getMyAppointments = () => API.get('/appointments')
export const getAllAppointments = () => API.get('/appointments/all')
export const updateAppointmentStatus = (id, status) => API.put(`/appointments/${id}`, { status })

export default API
