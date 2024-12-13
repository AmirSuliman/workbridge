import { combineReducers } from 'redux';
import userRolesReducer from './slices/userRolesSlice';
import authReducer from './slices/authSlice';
import usersReducer from './slices/userSlice';
import myInfoReducer from './slices/myInfoSlice';
import employeeReducer from './slices/employeeInfoSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  userRoles: userRolesReducer,
  users: usersReducer,
  myInfo: myInfoReducer,
  employee: employeeReducer,
  
});
