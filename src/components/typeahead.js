import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Suggestions from './Suggestions'
import base from '../base'

class Typeahead extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: '',
      suggestions: [],
      people: {}
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.handleCheckIn = this.handleCheckIn.bind(this)
    this.handleCheckOut = this.handleCheckOut.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)
    this.updateSuggestions = this.updateSuggestions.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    // base.fetch('members', {
    //   context: this
    // }).then(data => {
    //   this.setState({ people: data })
    // })
    this.ref = base.syncState('members', {
      context: this,
      state: 'people'
    })
  }

  componentWillUnmount() {
    base.removeBinding(this.ref)
  }

  handleCheckIn (personKey) {
    const newPeopleState = { ...this.state.people }
    newPeopleState[personKey] = { ...newPeopleState[personKey], checkedIn: true }
    this.setState({ people: newPeopleState })
    const newSuggestions = [ ...this.state.suggestions ]
    const suggestionIndex = newSuggestions.findIndex(suggestion => suggestion.key === personKey)
    newSuggestions[suggestionIndex].checkedIn = true
    this.setState({ suggestions: newSuggestions })
  }

  handleCheckOut (personKey) {
    const newPeopleState = { ...this.state.people }
    newPeopleState[personKey] = { ...newPeopleState[personKey], checkedIn: false }
    this.setState({ people: newPeopleState })
    const newSuggestions = [ ...this.state.suggestions ]
    const suggestionIndex = newSuggestions.findIndex(suggestion => suggestion.key === personKey)
    newSuggestions[suggestionIndex].checkedIn = false
    this.setState({ suggestions: newSuggestions })
  }

  handleRegistration (name) {
    this.props.push(`/register/${name}`)
  }

  handleSubmit (event) {
    if (this.state.suggestions.length === 0) {
      this.handleRegistration(this.state.value)
    }
    else if (this.state.suggestions.length > 0 && !this.state.suggestions[0].checkedIn) {
      this.handleCheckIn(this.state.suggestions[0].key)
    }
    else {
      this.handleCheckOut(this.state.suggestions[0].key)
    }
    event.preventDefault()
  }

  convertFirebaseObjectToArray () {
    return Object.keys(this.state.people).map(key => {
      return {
        ...this.state.people[key],
        key: key
      }
    })
  }

  findMatches (name) {
    if (name && name.length > 2) {
      const peopleAsArray = this.convertFirebaseObjectToArray()
      return peopleAsArray.filter(person => {
        const regex = new RegExp(name, 'gi')
        return person.name.match(regex)
      })
    } else return []
  }

  updateSuggestions (value) {
    const suggestions = this.findMatches(value)
    this.setState({
      value: value,
      suggestions: suggestions
    })
  }

  onInputChange (event) {
    this.updateSuggestions(event.target.value)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} className='search-form'>
        <input type='text' value={this.state.value} className='search' placeholder='Enter name...' onChange={this.onInputChange} />
        { this.state.suggestions.length === 0 && <button className='register-button'>Register</button> }
        <Suggestions suggestions={this.state.suggestions}
          handleCheckIn={this.handleCheckIn}
          handleCheckOut={this.handleCheckOut} />
      </form>
    )
  }
}

Typeahead.PropTypes = {
  push: React.PropTypes.func.isRequired
}

const TypeaheadWithRouter = withRouter(Typeahead)
export default TypeaheadWithRouter
