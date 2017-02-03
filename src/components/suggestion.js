import React from 'react'
import CheckInButton from './checkInButton'

const Suggestion = ({ handleCheckIn, suggestion}) => {

  const handleCheckInClick = () => handleCheckIn(suggestion.id)

  return (
    <li>
      <span className='name'>{suggestion.name}</span>
      <CheckInButton checkedIn={suggestion.checkedIn} handleCheckIn={handleCheckInClick} />
    </li>
  )
}

Suggestion.PropTypes = {
  handleCheckIn: React.PropTypes.func.isRequired,
  suggestion: React.PropTypes.func.isRequired
}

export default Suggestion
