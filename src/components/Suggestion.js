import React from 'react'
import PropTypes from 'prop-types'
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
  toggleCheckIn: PropTypes.func.isRequired,
  suggestion: PropTypes.func.isRequired
}

export default Suggestion
