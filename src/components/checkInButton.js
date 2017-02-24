import React from 'react'

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
  checkedIn: React.PropTypes.object.isRequired,
  toggleCheckIn: React.PropTypes.func.isRequired
}

export default CheckInButton
