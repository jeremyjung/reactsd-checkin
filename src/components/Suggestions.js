import React from 'react'
import PropTypes from 'prop-types'
import Suggestion from './Suggestion'

const Suggestions = ({suggestions, toggleCheckIn}) => {

  const renderSuggestion = (suggestion) => {
    return (
      <Suggestion
        key={suggestion.key}
        suggestion={suggestion}
        toggleCheckIn={toggleCheckIn} />
    )
  }

  return (
    <ul className='suggestions'>
      { suggestions.map(suggestion => renderSuggestion(suggestion)) }
    </ul>
  )
}

Suggestions.PropTypes = {
  suggestions: PropTypes.array.isRequired,
  toggleCheckIn: PropTypes.func.isRequired
}

export default Suggestions
