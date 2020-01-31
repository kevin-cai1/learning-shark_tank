import { learningPlan, learningEntry } from '../apis/learning';

import {
  GET_LEARNING_ACTIVE,
  GET_LEARNING_ALL,
  GET_LEARNING_USER,
  ADD_LEARNING_ENTRY
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

export const addLearningEntry = (data) => async(getState) => {
  const headers = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const data = {
    
  }

  await learningEntry.post('/add/' + getState().login.email, headers)
    
}