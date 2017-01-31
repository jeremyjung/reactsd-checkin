import React, { Component } from 'react'
import Suggestion from './suggestion'

class Suggestions extends Component {

  renderSuggestions () {
    if (this.props.suggestions.length === 0) return this.renderSuggestionsPlaceholder()
    return this.props.suggestions.map(suggestion => this.renderSuggestion(suggestion))
  }

  renderSuggestion (suggestion) {
    return (
      <Suggestion key={suggestion.id} suggestion={suggestion} handleCheckIn={this.props.handleCheckIn} />
    )
  }

  renderSuggestionsPlaceholder () {
    return (
      <li>Search for your name to check in</li>
    )
  }

  render () {
    return (
      <ul className='suggestions'>
        { this.renderSuggestions() }
      </ul>
    )
  }
}

Suggestions.PropTypes = {
  suggestions: React.PropTypes.array.isRequired,
  handleCheckIn: React.PropTypes.func.isRequired
}

export default Suggestions
