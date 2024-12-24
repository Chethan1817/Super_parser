const BASE_URL = 'http://localhost:8001';
const API_KEY = "c47897b5-60cb-4094-b423-2c747eaeb0fb";

export const authService = {
    // Verify email and get JWT token
    verifyEmail: async (token) => {
        try {
            const response = await fetch(`${BASE_URL}/user/verifyemail/?token=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            
            // If verification is successful, store the JWT token
            if (data.status === "True" && data.Data.jwt_token) {
                localStorage.setItem('jwt_token', data.Data.jwt_token);
            }
            
            return { data };
        } catch (error) {
            console.error('Error verifying email:', error);
            throw error;
        }
    }
};

export const dashboardService = {
    // Get subscription details
    getSubscription: async () => {
        try {
            const token = localStorage.getItem('jwt_token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${BASE_URL}/user/subscription/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-API-KEY': API_KEY
                }
            });
            
            const data = await response.json();
            return { data };
        } catch (error) {
            console.error('Error fetching subscription:', error);
            throw error;
        }
    },

    // Get dashboard data
    getDashboardData: async () => {
        try {
            const token = localStorage.getItem('jwt_token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${BASE_URL}/user/dashboard/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-API-KEY': API_KEY
                }
            });
            
            const data = await response.json();
            return { data };
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    },

    // Update subscription
    updateSubscription: async (plan) => {
        try {
            const token = localStorage.getItem('jwt_token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await fetch(`${BASE_URL}/api/update-subscription/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'X-API-KEY': API_KEY
                },
                body: JSON.stringify({ plan })
            });
            
            const data = await response.json();
            return { data };
        } catch (error) {
            console.error('Error updating subscription:', error);
            throw error;
        }
    }
};

export default dashboardService;