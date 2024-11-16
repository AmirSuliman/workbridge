import { combineReducers } from 'redux';
import userRolesReducer from './slices/userRolesSlice';
import authReducer from './slices/authSlice';
import usersReducer from './slices/userSlice';

export const rootReducer = combineReducers({
    auth: authReducer,
    userRoles: userRolesReducer,
    users: usersReducer,
});
