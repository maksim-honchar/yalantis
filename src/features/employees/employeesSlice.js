import { createSlice } from '@reduxjs/toolkit'


export const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    data: []
  },
  reducers: {
    actionData: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { actionData } = employeesSlice.actions

export const selectData = state => state.employees.data

export default employeesSlice.reducer
