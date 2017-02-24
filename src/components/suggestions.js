import React from 'react'
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
  suggestions: React.PropTypes.array.isRequired,
  toggleCheckIn: React.PropTypes.func.isRequired,
}

export default Suggestions
