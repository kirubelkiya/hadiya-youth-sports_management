import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const loginApi = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const getMeApi = () => api.get('/auth/me');

// News
export const getNewsApi = (limit?: number) =>
  api.get('/news', { params: limit ? { limit } : {} });

export const getNewsAdminApi = () => api.get('/news/admin/all');

export const getNewsByIdApi = (id: number) => api.get(`/news/${id}`);

export const createNewsApi = (data: object) => api.post('/news', data);

export const updateNewsApi = (id: number, data: object) => api.put(`/news/${id}`, data);

export const deleteNewsApi = (id: number) => api.delete(`/news/${id}`);

// Events
export const getEventsApi = (limit?: number) =>
  api.get('/events', { params: limit ? { limit } : {} });

export const getEventsAdminApi = () => api.get('/events/admin/all');

export const getEventByIdApi = (id: number) => api.get(`/events/${id}`);

export const createEventApi = (data: object) => api.post('/events', data);

export const updateEventApi = (id: number, data: object) => api.put(`/events/${id}`, data);

export const deleteEventApi = (id: number) => api.delete(`/events/${id}`);

// Youth Programs
export const getYouthProgramsApi = (limit?: number) =>
  api.get('/youth-programs', { params: limit ? { limit } : {} });

export const getYouthAdminApi = () => api.get('/youth-programs/admin/all');

export const getYouthProgramByIdApi = (id: number) => api.get(`/youth-programs/${id}`);

export const createYouthProgramApi = (data: object) => api.post('/youth-programs', data);

export const updateYouthProgramApi = (id: number, data: object) => api.put(`/youth-programs/${id}`, data);

export const deleteYouthProgramApi = (id: number) => api.delete(`/youth-programs/${id}`);

// Sports
export const getSportsApi = (limit?: number) =>
  api.get('/sports', { params: limit ? { limit } : {} });

export const getSportsAdminApi = () => api.get('/sports/admin/all');

export const getSportByIdApi = (id: number) => api.get(`/sports/${id}`);

export const createSportApi = (data: object) => api.post('/sports', data);

export const updateSportApi = (id: number, data: object) => api.put(`/sports/${id}`, data);

export const deleteSportApi = (id: number) => api.delete(`/sports/${id}`);

// Achievements
export const getAchievementsApi = (limit?: number) =>
  api.get('/achievements', { params: limit ? { limit } : {} });

export const getAchievementsAdminApi = () => api.get('/achievements/admin/all');

export const getAchievementByIdApi = (id: number) => api.get(`/achievements/${id}`);

export const createAchievementApi = (data: object) => api.post('/achievements', data);

export const updateAchievementApi = (id: number, data: object) => api.put(`/achievements/${id}`, data);

export const deleteAchievementApi = (id: number) => api.delete(`/achievements/${id}`);

// Gallery
export const getGalleryApi = (category?: string) =>
  api.get('/gallery', { params: category ? { category } : {} });

export const getGalleryAdminApi = () => api.get('/gallery/admin/all');

export const getGalleryItemByIdApi = (id: number) => api.get(`/gallery/${id}`);

export const createGalleryItemApi = (data: object) => api.post('/gallery', data);

export const updateGalleryItemApi = (id: number, data: object) => api.put(`/gallery/${id}`, data);

export const deleteGalleryItemApi = (id: number) => api.delete(`/gallery/${id}`);

export const getDashboardStatsApi = () => api.get('/gallery/dashboard/stats');

// File upload
export const uploadImageApi = (file: File) => {
  const fd = new FormData();
  fd.append('image', file);
  return api.post<{ success: boolean; url: string }>('/upload', fd, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

// Contact Messages
export const submitContactMessageApi  = (data: object) => api.post('/contact', data);

// Registrations
export const submitRegistrationApi        = (data: object) => api.post('/registrations', data);
export const getRegistrationsAdminApi     = (type?: string) => api.get('/registrations/admin/all', { params: type ? { type } : {} });
export const updateRegistrationStatusApi  = (id: number, status: string) => api.put(`/registrations/admin/${id}/status`, { status });
export const deleteRegistrationApi        = (id: number) => api.delete(`/registrations/admin/${id}`);
export const getContactMessagesApi    = ()             => api.get('/contact/admin/all');
export const markMessageReadApi       = (id: number)   => api.put(`/contact/admin/${id}/read`);
export const deleteContactMessageApi  = (id: number)   => api.delete(`/contact/admin/${id}`);

export default api;
