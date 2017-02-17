import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'
import Typeahead from './components/Typeahead'
import RegisterPage from './components/RegisterPage'
import RegisterComplete from './components/RegisterComplete'
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
          <Route path={'/register/:personName'} component={RegisterPage} />
          <Route component={Typeahead} />
        </Switch>
      </div>
    </Router>
  )

export default App
