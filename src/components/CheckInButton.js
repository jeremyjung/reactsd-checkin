import React from 'react'
import PropTypes from 'prop-types'

const CheckInButton = ({checkedIn, toggleCheckIn}) => {

  const renderCheckIn = () => (
    <button type='button' onClick={toggleCheckIn} className='check-button'>Check In</button>
  )

  const renderCheckOut = () => (
    <button type='button' onClick={toggleCheckIn} className='check-button'>
      Check Out <span className='checkout-item'>x</span>
    </button>
  )

  return (
    <div>
      { checkedIn ? renderCheckOut() : renderCheckIn() }
    </div>
  )
}

CheckInButton.PropTypes = {
  checkedIn: PropTypes.object.isRequired,
  toggleCheckIn: PropTypes.func.isRequired
}

export default CheckInButton
