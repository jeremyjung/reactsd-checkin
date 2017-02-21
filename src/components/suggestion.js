import React from 'react'
import CheckInButton from './CheckInButton'

const Suggestion = ({ handleCheckIn, handleCheckOut, suggestion}) => {

  const handleCheckInClick = () => handleCheckIn(suggestion.key)
  const handleCheckOutClick = () => handleCheckOut(suggestion.key)

  return (
    <li>
      <span className='name'>{suggestion.name}</span>
      <CheckInButton checkedIn={suggestion.checkedIn}
        handleCheckIn={handleCheckInClick}
        handleCheckOut={handleCheckOutClick} />
    </li>
  )
}

Suggestion.PropTypes = {
  handleCheckIn: React.PropTypes.func.isRequired,
  handleCheckOut: React.PropTypes.func.isRequired,
  suggestion: React.PropTypes.func.isRequired
}

export default Suggestion
