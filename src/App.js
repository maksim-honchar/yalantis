import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import './App.css'

import { EmployeesPage } from './features/employees/EmployeesPage'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/employees" component={EmployeesPage} />
          <Redirect to="/employees" />
        </Switch>
      </Router>
    </div>
  )
}

export default App
