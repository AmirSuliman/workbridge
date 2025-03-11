export const BASE_URL = 'https://devbackend.isaworkbridge.com/'; // for development.
// export const BASE_URL = 'https://backend.uat.isaworkbridge.com/'; // for uat.
// export const BASE_URL = 'https://backend.app.isaworkbridge.com/'; // for production

export const API_ROUTES = {
  WEBSOCKET_URL: 'wss://devbackend.isaworkbridge.com', // for development
  // WEBSOCKET_URL: 'wss://backend.app.isaworkbridge.com', // for production
  // WEBSOCKET_URL: 'wss://uat.app.isaworkbridge.com', // for uat
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
  GET_NOTIFICATIONS: 'notifications',
  NOTIFICATION: 'notification',
};
