import { learningPlan, learningEntry, learningReport, learningTask } from '../apis/learning';

import {
  GET_LEARNING_ACTIVE,
  GET_LEARNING_ALL,
  GET_LEARNING_USER,
  MARK_AS_COMPLETE,
  ADD_LEARNING_ENTRY,
  GET_REPORT_ALL,
  GET_REPORT_BY_PILLAR,
  GET_TASK_ALL
} from './types';

export const getLearningActive = () => async(dispatch, getState) => {
  await learningPlan.get('/' + getState().login.email)
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

export const getReportAll = () => async(dispatch) => {
  await learningReport.get('/all')
  .then(res => {
    dispatch({ type: GET_REPORT_ALL, payload: res.data })
  })
  .catch(err => {
    console.log(err)
  })
}

export const getReportAllByPillar = () => async(dispatch) => {
  await learningReport.get('/all/pillar')
  .then(res => {
    dispatch({ type: GET_REPORT_BY_PILLAR, payload: res.data })
  })
  .catch(err => {
    console.log(err)
  })
}

export const getAllTasks = () => async(dispatch) => {
  await learningTask.get('/all')
  .then(res => {
    dispatch({ type: GET_TASK_ALL, payload: res.data })
  })
  .catch(err => {
    console.log(err)
  })
}
