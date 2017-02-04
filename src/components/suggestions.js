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

  const renderSuggestionsPlaceholder = () => {
    return (
      <li>Search for your name to check in</li>
    )
  }

  const renderSuggestions = () => {
    if (suggestions.length === 0) return renderSuggestionsPlaceholder()
    return suggestions.map(suggestion => renderSuggestion(suggestion))
  }

  return (
    <ul className='suggestions'>
      { renderSuggestions() }
    </ul>
  )
}

Suggestions.PropTypes = {
  suggestions: React.PropTypes.array.isRequired,
  handleCheckIn: React.PropTypes.func.isRequired,
  handleCheckOut: React.PropTypes.func.isRequired
}

export default Suggestions
