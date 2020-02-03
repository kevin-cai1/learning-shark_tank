import { GET_COACHEE_TASK } from '../actions/types'

const initialState = {
  coachees: null
}

export default (state = initialState, action) => {
  let newState = {...state}
  switch (action.type) {
    case GET_COACHEE_TASK:
      newState.coachees = action.payload
      return newState;
    default:
      return newState;
  }
}