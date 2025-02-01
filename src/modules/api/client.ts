// import axios, {
//   AxiosError,
//   AxiosResponse,
//   InternalAxiosRequestConfig,
// } from 'axios';
// import { Session } from 'next-auth';
// import { getSession, signOut } from 'next-auth/react';

// export interface CustomSession extends Session {
//   accessToken: string;
// }

// import type { Endpoints } from './api-spec';
// import { forEndpoints } from './endpoints';
// import type { EndpointsConfig } from './types';

// export const cancelToken = axios.CancelToken;

// export const axiosInstance = axios.create({
//   baseURL: process.env.API_URL,
// });

// const requestHandler = async (request: InternalAxiosRequestConfig) => {
//   const session = (await getSession()) as CustomSession;
//   const accessToken = session?.accessToken as string;
//   if (session) {
//     request.headers.Authorization = accessToken;
//   }
//   return request;
// };

// axiosInstance.interceptors.request.use(requestHandler);

// const responseSuccessHandler = (response: AxiosResponse) => {
//   return response;
// };

// const responseErrorHandler = async (error: AxiosError) => {
//   if (error.response && error.response.status === 401) {
//     await signOut();
//     window.location.href = '/signin';
//   }
//   return Promise.reject(error);
// };

// axiosInstance.interceptors.response.use(
//   (res) => responseSuccessHandler(res),
//   (error) => responseErrorHandler(error),
// );

// const rawApi = forEndpoints<Endpoints>(axiosInstance);

// function api<Url extends keyof Endpoints>(
//   url: Url,
//   config: EndpointsConfig<Url>,
// ) {
//   const source = cancelToken.source();

//   const promise = rawApi<Url>(url, {
//     cancelToken: source.token,
//     ...config,
//   });

//   // @ts-ignore
//   promise.cancel = () => {
//     source.cancel('Query was cancelled by React Query');
//   };

//   return promise;
// }

// export default api;
