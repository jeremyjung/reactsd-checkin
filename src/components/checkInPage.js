import React, { Component } from 'react'
import db from '../services/db'

class CheckInPage extends Component {

  componentWillMount () {
    const person = db.findPerson(this.props.match.params.personId)
    person ? this.setState({ person: person })
           : this.setState({ person: undefined })
  }

  renderExistingPerson () {
    return (
      <div>
        <span>Hi {this.state.person.name}!  Let's check you in.</span>
        <button className='check-in'>Check in!</button>
      </div>
    )
  }

  renderNewPerson () {
    return (
      <span>You tried to check in, but it looks like you're new.</span>
    )
  }

  render () {
    return (
      <div className='checkin-form'>
        { this.state.person ? this.renderExistingPerson() : this.renderNewPerson() }
      </div>
    )
  }
}

export default CheckInPage
