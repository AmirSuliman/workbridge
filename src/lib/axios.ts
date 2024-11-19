import axios from 'axios';
import { BASE_URL } from '../constants/apiRoutes';
import { getSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface CustomSession extends Session {
    accessToken: string;
}

axiosInstance.interceptors.request.use(
    async (config) => {
        const session = await getSession() as CustomSession;
        if (session && session.accessToken) {
            config.headers['Authorization'] = `Bearer ${session.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
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

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            // await signOut();
            // window.location.href = '/';
            // console.error('Unauthorized! Redirecting to login...');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
