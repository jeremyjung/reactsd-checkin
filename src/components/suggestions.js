import React from 'react'
import Suggestion from './suggestion'

const Suggestions = ({suggestions, handleCheckIn, handleCheckOut}) => {

  const renderSuggestion = (suggestion) => {
    return (
      <Suggestion
        key={suggestion.id}
        suggestion={suggestion}
        handleCheckIn={handleCheckIn}
        handleCheckOut={handleCheckOut} />
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
  handleCheckIn: React.PropTypes.func.isRequired,
  handleCheckOut: React.PropTypes.func.isRequired
}

export default Suggestions
