import React, { Component } from 'react'
import CheckInButton from './checkInButton'

class Suggestion extends Component {

  constructor (props) {
    super(props)
    this.handleCheckIn = this.handleCheckIn.bind(this)
  }

  handleCheckIn () {
    this.props.handleCheckIn(this.props.suggestion.id)
  }

  render () {
    return (
      <li>
        <span className='name'>{this.props.suggestion.name}</span>
        <CheckInButton checkedIn={this.props.suggestion.checkedIn} handleCheckIn={this.handleCheckIn} />
      </li>
    )
  }
}

Suggestion.PropTypes = {
  handleCheckIn: React.PropTypes.func.isRequired
}

export default Suggestion
