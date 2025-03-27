export const BASE_URL = 'https://backend.uat.isaworkbridge.com/'; // for uat.
// export const BASE_URL = 'https://devbackend.isaworkbridge.com/'; // for development.
// export const BASE_URL = 'https://backend.app.isaworkbridge.com/'; // for production

export const API_ROUTES = {
  // WEBSOCKET_URL: 'wss://uat.app.isaworkbridge.com', // for uat
  WEBSOCKET_URL: 'wss://devbackend.isaworkbridge.com', // for development
  // WEBSOCKET_URL: 'wss://backend.app.isaworkbridge.com', // for production
  LOGIN: `user/login`,
  GET_USERS: `users`,
  USER_ROLES: `roles`,
  POST_OFFER: 'offer',
  CREATE_USER: `user`,
  PUT_JOB: 'openPosition',
  POST_JOB: 'openPosition',
  GET_JOBS: 'openPositions',
  GET_EMPLOYEES: 'employees',
  GET_CANDIDATES: `candidates`,
  NOTIFICATION: 'notification',
  GET_DEPARTMENTS: 'departments',
  GET_NOTIFICATIONS: 'notifications',
  FORGOT_PASSWORD: `user/resetPassword`,
  CONFIRM_ACCOUNT: `user/confirmAccount`,
  GET_jOB_APPLICATIONS: 'jobApplications',
  CONFIRM_RESET_PASSWORD: `user/confirmResetPassword`,
};
