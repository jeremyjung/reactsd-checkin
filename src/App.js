import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Typeahead from './components/typeahead'
import CheckInPage from './components/checkInPage'
import './style.css'

class App extends Component {

  render () {
    return (
      <Router>
        <div>
          <div className='App-header'>
            <h1>React SD Check-in</h1>
          </div>
          <Switch>
            <Route path={'/:personId'} component={CheckInPage} />
            <Route component={Typeahead} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
