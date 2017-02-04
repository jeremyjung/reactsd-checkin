import React from 'react'

const CheckInButton = ({checkedIn, handleCheckIn, handleCheckOut}) => {

  const renderCheckIn = () => (
    <button type='button' onClick={handleCheckIn} className='check-button'>Check In</button>
  )

  const renderCheckOut = () => (
    <button type='button' onClick={handleCheckOut} className='check-button'>
      Check Out <span className='checkout-item'>(X)</span>
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
  handleCheckIn: React.PropTypes.func.isRequired
}

export default CheckInButton
