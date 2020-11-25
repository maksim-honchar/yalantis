import { configureStore } from '@reduxjs/toolkit'
import throttle from 'lodash.throttle'
import employeesReducer from '../features/employees/employeesSlice'
import { saveState } from './sessionStorage'


const store = configureStore({
  reducer: {
    employees: employeesReducer
  },
})

store.subscribe(throttle(() => {
  saveState({
    employees: store.getState().employees
  })
}, 1000))


export default store