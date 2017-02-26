import React from 'react'
import CheckInButton from './CheckInButton'

const Suggestion = ({ toggleCheckIn, suggestion }) => {

  const toggleCheckInClick = () => toggleCheckIn(suggestion.key)

  return (
    <li>
      <span className='name'>{suggestion.name}</span>
      <CheckInButton checkedIn={suggestion.checkedIn}
        toggleCheckIn={toggleCheckInClick} />
    </li>
  )
}

Suggestion.PropTypes = {
  toggleCheckIn: React.PropTypes.func.isRequired,
  suggestion: React.PropTypes.func.isRequired
}

export default Suggestion
