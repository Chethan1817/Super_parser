import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001';

localStorage.setItem('jwt_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0MywiZW1haWwiOiJwLjk1NzMzQGdtYWlsLmNvbSIsImV4cCI6MTc0MTg1MTUxNH0.Q1ZWAJdkCCaLNltXSrgkpd-TS5VDpdFVun_90g_DpGQ');

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    // Get token directly in the interceptor
    const token = localStorage.getItem('jwt_token');
    const apiKey = "c47897b5-60cb-4094-b423-2c747eaeb0fb";
    
    // Add headers to the config
    config.headers = {
        ...config.headers,
        'Authorization': token ? `Bearer ${token}` : '',
        'X-API-KEY': apiKey,
    };
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('Response Error:', {
            message: error.message,
            data: error.response?.data,
            status: error.response?.status
        });
        return Promise.reject(error);
    }
);

export const dashboardService = {
    getSubscription: async () => {
        try {
            const response = await api.get('/user/subscription/');
            return response;
        } catch (error) {
            // If token is invalid or missing, log out user and redirect to login
            if (error.response?.status === 401) {
                localStorage.removeItem('jwt_token');
                // Redirect to login if needed
                // window.location.href = '/login';
            }
            console.error('Subscription Error:', error);
            throw error;
        }
    },
    
    updateSubscription: (plan) => 
        api.post('/api/update-subscription/', { plan }),
        
    getDashboardData: () => 
        api.get('/user/dashboard/'),
};

export default api;