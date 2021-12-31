import { combineReducers } from 'redux';
import alert from '../reducers/alertReducer';
import auth from '../reducers/authReducer';
import course from '../reducers/courseReducer';
import review from '../reducers/reviewReducer';
import user from '../reducers/userReducer';

const reducers = combineReducers({
  alert,
  auth,
  course,
  review,
  user,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
