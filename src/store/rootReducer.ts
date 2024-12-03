import { combineReducers } from 'redux';
import userRolesReducer from './slices/userRolesSlice';
import authReducer from './slices/authSlice';
import usersReducer from './slices/userSlice';
import myInfoReducer from './slices/myInfoSlice';
import employeeReducer from './slices/employeeInfoSlice';
import CandidateReducer from './slices/allCandidateSlice';
import jobsReducer from './slices/getOpenPositionSlice';
import allEmployeesReducer from './slices/allEmployeesSlice';
import jobApplicationsReducer from './slices/jobApplicationsSlice';
export const rootReducer = combineReducers({
  auth: authReducer,
  userRoles: userRolesReducer,
  users: usersReducer,
  myInfo: myInfoReducer,
  employee: employeeReducer,
  candidate: CandidateReducer,
  employees: allEmployeesReducer,
  jobs: jobsReducer,
  jobApplications: jobApplicationsReducer,
});
