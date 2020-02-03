import {
  GET_LEARNING_ACTIVE,
  GET_LEARNING_ALL,
  GET_LEARNING_USER,
  GET_REPORT_ALL,
  GET_REPORT_BY_PILLAR
} from '../actions/types';

const initialState = {
  activePlan: null,
  userPlan: null,
  allPlan: null,
}

export default (state = initialState, action) => {
  let newState = { ...state };
  switch(action.type) {
    case GET_LEARNING_ACTIVE:
      newState.activePlan = action.payload
      return newState;
    case GET_REPORT_ALL:
      newState.activePlan = action.payload
      return newState;
    case GET_REPORT_BY_PILLAR:
      newState.activePlan = action.payload
      return newState;
    default:
      return newState;
  }
}