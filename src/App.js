import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import Typeahead from './components/typeahead'
import './style.css'

class App extends Component {

  render () {
    return (
      <Router>
        <div>
          <div className='App-header'>
            <h1>React SD Check-in</h1>
          </div>
          <Route component={Typeahead} />
        </div>
      </Router>
    )
  }
}

export default App
