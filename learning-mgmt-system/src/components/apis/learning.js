import axios from 'axios';

export const learningEntry = axios.create({
  baseURL: "http://localhost:5000/entry"
});

export const learningPlan = axios.create({
  baseURL: "http://localhost:5000/plan"
});

export const learningReport = axios.create({
  baseURL: "http://localhost:5000/report"
})