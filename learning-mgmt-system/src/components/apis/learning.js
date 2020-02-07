import axios from 'axios';

export const learningEntry = axios.create({
  baseURL: "http://learning-tracker-api.herokuapp.com/entry"
});

export const learningPlan = axios.create({
  baseURL: "http://learning-tracker-api.herokuapp.com/plan"
});

export const learningReport = axios.create({
  baseURL: "http://learning-tracker-api.herokuapp.com/report"
})

export const learningTask = axios.create({
  baseURL: "http://learning-tracker-api.herokuapp.com/task"
})

export const learningCoach = axios.create({
  baseURL: "http://learning-tracker-api.herokuapp.com/coach"
})