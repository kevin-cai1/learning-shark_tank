import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import planReducer from './planReducer';
import taskReducer from './taskReducer';
import coachReducer from './coachReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  plan: planReducer,
  task: taskReducer,
  coach: coachReducer
})

export default rootReducer;