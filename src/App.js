import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import Typeahead from './components/typeahead'
import CheckInPage from './components/checkInPage'
import RegisterPage from './components/registerPage'
import './style.css'

const App = () =>
  (
    <Router>
      <div>
        <div className='App-header'>
          <h1><Link className='checkin-header' to='/'>React SD Check-in</Link></h1>
        </div>
        <Switch>
          <Route path={'/checkin/:personId'} component={CheckInPage} />
          <Route path={'/register/:personName'} component={RegisterPage} />
          <Route component={Typeahead} />
        </Switch>
      </div>
    </Router>
  )

export default App
