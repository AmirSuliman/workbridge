export const BASE_URL = "http://localhost:3000/api";

export const API_ROUTES = {
    LOGIN: `/login`,
    REGISTER: `/register`,
    LOGOUT: `/logout`,
    GET_EMPLOYEES: `/employees`,
    GET_EMPLOYEE_BY_ID: (id: string) => `/employee/${id}`,
    UPDATE_EMPLOYEE: (id: string) => `/employee/${id}`,
    DELETE_EMPLOYEE: (id: string) => `/employee/${id}`,
    CREATE_ANNOUNCEMENT: `/announcement`,
};