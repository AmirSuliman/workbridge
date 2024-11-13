import axios from 'axios';
import { BASE_URL } from '../constants/apiRoutes';
import { getSession } from 'next-auth/react';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        // Get session (which includes the JWT token)
        // const session: any = await getSession();
        // console.log('session', session);
        // if (session && session.accessToken) {
        // Attach the token to the Authorization header
        // config.headers['Authorization'] = `Bearer ${session.accessToken}`;
        // }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// axiosInstance.interceptors.request.use(
//     (config) => {
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         if (error.response && error.response.status === 401) {
//             console.error('Unauthorized! Redirecting to login...');
//         } else if (error.response && error.response.status >= 500) {
//             console.error('Server Error! Please try again later.');
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;
