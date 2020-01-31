import { learningPlan, learningEntry } from '../apis/learning';

import {
  GET_LEARNING_ACTIVE,
  GET_LEARNING_ALL,
  GET_LEARNING_USER,
  MARK_AS_COMPLETE
} from './types';

export const getLearningActive = () => async(dispatch, getState) => {
  await learningPlan.get('/active/' + getState().login.email)
    .then(res => {
      dispatch({ type: GET_LEARNING_ACTIVE, payload: res.data })
    })
    .catch(err => {
      console.log(err)
    })
}

export const markAsComplete = (task) => async(dispatch, getState) => {
  await learningEntry.put('/' + getState().login.email)
  .then(res => {
    dispatch({ type: markAsComplete, payload: res.data })
  })
  .catch(err => {
    console.log(err)
  })
}
