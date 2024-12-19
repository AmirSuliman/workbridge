export const BASE_URL = 'https://devbackend.isaworkbridge.com/';

export const API_ROUTES = {
  FORGOT_PASSWORD: `user/resetPassword`,
  CONFIRM_RESET_PASSWORD: `user/confirmResetPassword`,
  GET_USERS: `users`,
  USER_ROLES: `roles`,
  LOGIN: `user/login`,
  CREATE_USER: `user`,
  CONFIRM_ACCOUNT: `user/confirmAccount`,
  GET_DEPARTMENTS: 'departments',
  POST_JOB: 'openPosition',
  PUT_JOB: 'openPosition',
  GET_JOBS: 'openPositions',
  GET_EMPLOYEES: 'employees',
  GET_CANDIDATES: `candidates`,
  GET_jOB_APPLICATIONS: 'jobApplications',
  POST_OFFER: 'offer',
};
