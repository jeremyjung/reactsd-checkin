import React, { Component } from 'react'
import db from '../services/db'

class CheckOutPage extends Component {

  componentWillMount () {
    const person = db.findPerson(this.props.match.params.personId)
    if (person) {
      db.checkOutPersonById(person.id)
      this.setState({ person: person })
    }
    else {
      this.setState({ person: undefined })
    }
  }

  renderExistingPerson () {
    return (
      <div>
        <span>Hi {this.state.person.name}!  You're checked out now</span>
      </div>
    )
  }

  renderNewPerson () {
    return (
      <span>You tried to check out, but it looks like you're new.</span>
    )
  }

  render () {
    return (
      <div className='check-form'>
        { this.state.person ? this.renderExistingPerson() : this.renderNewPerson() }
      </div>
    )
  }
}

CheckOutPage.PropTypes = {
  match: React.PropTypes.object.isRequired
}

export default CheckOutPage
