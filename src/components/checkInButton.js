import React, { Component } from 'react'

class CheckInButton extends Component {
  render () {
    return (
      <div>
        <button onClick={this.props.handleCheckIn} disabled={this.props.checkedIn} className='check-in'>
          { this.props.checkedIn ? 'Checked In' : 'Check In' }
        </button>
      </div>
    )
  }
}

CheckInButton.PropTypes = {
  checkedIn: React.PropTypes.object.isRequired,
  handleCheckIn: React.PropTypes.func.isRequired
}

export default CheckInButton
