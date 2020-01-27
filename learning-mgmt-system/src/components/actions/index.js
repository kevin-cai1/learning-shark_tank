import { learningPlan } from '../apis/learning';

import {
  GET_LEARNING_ACTIVE,
  GET_LEARNING_ALL,
  GET_LEARNING_USER
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