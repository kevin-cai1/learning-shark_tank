import {
  GET_TASK_ALL
} from '../actions/types'

const initialState = {
  allTasks: null
}

export default (state = initialState, action) => {
  let newState = {...state};
  switch (action.type) {
    case GET_TASK_ALL:
      newState.allTasks = action.payload;
      return newState;
    default:
      return newState;
  }
}