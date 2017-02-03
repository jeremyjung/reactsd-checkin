import React, { Component } from 'react'
import db from '../services/db'

class CheckInPage extends Component {

  componentWillMount () {
    const person = db.findPerson(this.props.match.params.personId)
    if (person) {
      db.checkInPersonById(person.id)
      this.setState({ person: person })
    }
    else {
      this.setState({ person: undefined })
    }
  }

  renderExistingPerson () {
    return (
      <div>
        <span>Hi {this.state.person.name}!  Thanks for checking in. You're now entered into the raffle!</span>
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

CheckInPage.PropTypes = {
  match: React.PropTypes.object.isRequired
}

export default CheckInPage
