import { useEffect } from 'react';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            // Add any custom headers or authentication tokens to the request config if needed
            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                // Handle error responses
                return Promise.reject(error);
            }
        );
    }, []);

    return [axiosSecure];
};

export default useAxiosSecure;
