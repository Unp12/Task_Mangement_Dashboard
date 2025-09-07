import axios from 'axios';

const API = axios.create({
  baseURL: '/api', // Base URL for all API requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to add the authentication token to all requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle responses and potential errors
API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error codes or show a generic error message
    if (error.response) {
        if(error.response.status === 401){
            //Handle 401 Unauthorized, maybe redirect to login
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

      console.error('API Error:', error.response.data);
      // You could show a toast or alert here
    } else if (error.request) {
      console.error('Network Error:', error.request);
      // Show a network error message
    } else {
      console.error('Unexpected Error:', error.message);
      // Show a generic error message
    }
    return Promise.reject(error);
  }
);

export default API;