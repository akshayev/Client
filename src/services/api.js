import axios from 'axios';

// Create an Axios instance with a base URL
const apiClient = axios.create({
  baseURL: "https://cpc-photography-api.onrender.com/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the auth token to every request if it exists
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken'); // Assumes you store the token in localStorage after login
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Generic API functions
const get = (endpoint) => apiClient.get(endpoint);
const create = (endpoint, data) => apiClient.post(endpoint, data);
const update = (endpoint, id, data) => apiClient.put(`${endpoint}/${id}`, data);
const remove = (endpoint, id) => apiClient.delete(`${endpoint}/${id}`);

// --- Specific API Services ---

export const authApi = {
  login: (credentials) => apiClient.post('/auth/login', credentials),
  verifyToken: () => apiClient.get('/auth/verify'),
  getMe: () => apiClient.get('/auth/me'),
};


export const heroApi = {
  getAll: () => get('/hero'),
  create: (data) => create('/hero', data),
  update: (id, data) => update('/hero', id, data),
  delete: (id) => remove('/hero', id),
};

export const eventsApi = {
  getAll: () => get('/events'),
  create: (data) => create('/events', data),
  update: (id, data) => update('/events', id, data),
  delete: (id) => remove('/events', id),
};

export const teamApi = {
  getAll: () => get('/team'),
  create: (data) => create('/team', data),
  update: (id, data) => update('/team', id, data),
  delete: (id) => remove('/team', id),
};

export const testimonialsApi = {
  getAll: () => get('/testimonials'),
  create: (data) => create('/testimonials', data),
  update: (id, data) => update('/testimonials', id, data),
  delete: (id) => remove('/testimonials', id),
};

export const instagramApi = {
  getAll: () => get('/instagram'),
  create: (data) => create('/instagram', data),
  update: (id, data) => update('/instagram', id, data),
  delete: (id) => remove('/instagram', id),
};

export const galleryApi = {
  getAll: () => get('/gallery'),
  create: (data) => create('/gallery', data), // API supports URL-only creation which matches the UI
  update: (id, data) => update('/gallery', id, data),
  delete: (id) => remove('/gallery', id),
};

export const usersApi = {
  // Use the generic 'get' but include params for pagination
  getAll: (page = 1, limit = 10) => get(`/users?page=${page}&limit=${limit}`),
  
  // These fit the generic helper functions perfectly
  create: (data) => create('/users', data),
  update: (id, data) => update('/users', id, data),
  delete: (id) => remove('/users', id),
  
  // These are custom PATCH requests that don't fit the generic helpers
  // They match the 'Toggle User Status' and 'Change User Role' Postman endpoints
  updateStatus: (id, isActive) => apiClient.patch(`/users/${id}/status`, { isActive }),
  updateRole: (id, role) => apiClient.patch(`/users/${id}/role`, { role }),
};

export default apiClient;