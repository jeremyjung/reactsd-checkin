import React, { Component } from 'react'
import db from '../services/db'

class CheckInPage extends Component {

  componentWillMount () {
    console.log(this.props.match.params)
    // const person = db.findPerson(this.props.match.params.personId)
    // person ? this.setState({ person: person })
    //        : this.setState({ person: undefined })
  }

  renderExistingPerson () {
    return (
      <span>Hi {this.state.person.name}!  Let's check in.</span>
    )
  }

  renderNewPerson () {
    return (
      <span>Hello new person!  Let's get you registered.</span>
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
