import { combineReducers } from 'redux';

import loginReducer from './loginReducer';
import planReducer from './planReducer';
import taskReducer from './taskReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  plan: planReducer,
  task: taskReducer
})

export default rootReducer;