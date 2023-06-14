import { useEffect } from 'react';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'https://summer-camp-school-server-jhtanjim.vercel.app',
});

const useAxiosSecure = () => {
    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            (error) => {
                return Promise.reject(error);
            }
        );
    }, []);

    return [axiosSecure];
};

export default useAxiosSecure;
