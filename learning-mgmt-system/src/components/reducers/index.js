import { combineReducers } from 'redux';

import loginReducer from './loginReducer'
import planReducer from './planReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  plan: planReducer
})

export default rootReducer;