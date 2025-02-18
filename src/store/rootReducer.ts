import { combineReducers } from 'redux';
import userRolesReducer from './slices/userRolesSlice';
import authReducer from './slices/authSlice';
import usersReducer from './slices/userSlice';
import myInfoReducer from './slices/myInfoSlice';
import employeeReducer from './slices/employeeInfoSlice';
import candidatesReducer from './slices/allCandidateSlice';
import candidateReducer from './slices/candidateSlice';
import jobsReducer from './slices/getOpenPositionSlice';
import allEmployeesReducer from './slices/allEmployeesSlice';
import jobApplicationsReducer from './slices/jobApplicationsSlice';
import jobApplicationReducer from './slices/jobApplicationSlice';
import interviewReducer from './slices/interviewInviteSlice';
import folderReducer from './slices/folderSlice';
import policyReducer from './slices/postPolicy';
import noteReducer from './slices/noteSlice';
import surveyReducer from './slices/surveySlice';
import emergencyContactReducer from './slices/emergencyContactSlice';
import notificationsReducer from './slices/notificationsSlice';
import aiReviewReducer from './slices/candidateEvaluationSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  userRoles: userRolesReducer,
  users: usersReducer,
  myInfo: myInfoReducer,
  employee: employeeReducer,
  candidates: candidatesReducer,
  candidate: candidateReducer,
  employees: allEmployeesReducer,
  jobs: jobsReducer,
  notes: noteReducer,
  policy: policyReducer,
  jobApplications: jobApplicationsReducer,
  jobApplication: jobApplicationReducer,
  interview: interviewReducer,
  folder: folderReducer,
  surveys: surveyReducer,
  emergencyContact: emergencyContactReducer,
  notifications: notificationsReducer,
  aiReview: aiReviewReducer,
});
