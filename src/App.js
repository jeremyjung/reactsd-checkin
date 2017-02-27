import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import Typeahead from './components/pages/Typeahead'
import Register from './components/pages/Register'
import RegisterComplete from './components/pages/RegisterComplete'
import './style.css'

const App = () =>
  (
    <Router>
      <div>
        <div className='App-header'>
          <h1><Link className='checkin-header' to='/'>React SD Check-in</Link></h1>
        </div>
        <Switch>
          <Route path={'/register/complete/:personName'} component={RegisterComplete} />
          <Route path={'/register/:personName'} component={Register} />
          <Route component={Typeahead} />
        </Switch>
      </div>
    </Router>
  )

export default App
