import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import './App.css'

import { Employees } from './features/employees/Employees'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/employees" component={Employees} />
          <Redirect to="/employees" />
        </Switch>
      </Router>
    </div>
  )
}

export default App
