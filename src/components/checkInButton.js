import React, { Component } from 'react'

const CheckInButton = ({checkedIn, handleCheckIn}) =>
  (
    <div>
      <button type='button' onClick={handleCheckIn} disabled={checkedIn} className='check-in'>
        { checkedIn ? 'Checked In' : 'Check In' }
      </button>
    </div>
  )

CheckInButton.PropTypes = {
  checkedIn: React.PropTypes.object.isRequired,
  handleCheckIn: React.PropTypes.func.isRequired
}

export default CheckInButton
