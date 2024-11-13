export const BASE_URL = "https://devbackend.isaworkbridge.com/";

export const API_ROUTES = {
    LOGIN: `user/login`,
    REGISTER: `register`,
    LOGOUT: `logout`,
    GET_EMPLOYEES: `/employees`,
    GET_EMPLOYEE_BY_ID: (id: string) => `employee/${id}`,
    UPDATE_EMPLOYEE: (id: string) => `employee/${id}`,
    DELETE_EMPLOYEE: (id: string) => `employee/${id}`,
    CREATE_ANNOUNCEMENT: `announcement`,
};