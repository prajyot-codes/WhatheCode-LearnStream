import apiClient from './axios'; // Your configured Axios instance

// Function to call the backend refresh token endpoint
export const fetchNewAccessToken = async () => {
    try {
        const response = await apiClient.post('/auth/refresh-Token', {}, { withCredentials: true });
        const { accessToken } = response.data.data;

        // Store the new access token in localStorage
        localStorage.setItem('studentAccessToken', accessToken);

        return accessToken; // Return the new token for immediate use if needed
    } catch (error) {
        console.error('Error refreshing access token:', error.response?.data?.message || error.message);
        throw error; // Handle logout or other fallback logic if needed
    }
};
