// src/services/apiService.js
import axios from 'axios';
import router from '../router';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000', // Updated with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

apiClient.interceptors.request.use(
    (config) => {
        //menambah token ke header request jika ada
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request config: ", error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 403) {
            localStorage.removeItem("token");
            router.push("/login");
        }
        console.error("Response error:", error);
        return Promise.reject(error);
    }
);

export default apiClient;
