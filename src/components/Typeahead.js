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
    this.toggleCheckIn = this.toggleCheckIn.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)
    this.updateSuggestions = this.updateSuggestions.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    base.fetch('members', {
      context: this
    }).then(data => {
      if (data != null) this.setState({ people: data })
    })

  }

  componentWillUnmount() {
  }

  toggleCheckIn (personKey) {
    const newPeopleState = { ...this.state.people }
    const person = { ...newPeopleState[personKey] }
    const newCheckedInState = person.checkedIn = !person.checkedIn
    newPeopleState[personKey] = { ...person, checkedIn: newCheckedInState}
    this.setState({ people: newPeopleState }, () => {
      this.updateSuggestions()
      base.update(`members/${personKey}`, {
          data: { ...newPeopleState[personKey] }
      })
    })
  }

  handleRegistration (name) {
    this.props.push(`/register/${name}`)
  }

  handleSubmit (event) {
    if (this.state.suggestions.length === 0) {
      this.handleRegistration(this.state.value)
    }
    else this.toggleCheckIn(this.state.suggestions[0].key)

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

  updateSuggestions () {
    const suggestions = this.findMatches(this.state.value)
    this.setState({
      suggestions: suggestions
    })
  }

  onInputChange (event) {
    this.setState({
      value: event.target.value
    }, () => this.updateSuggestions())
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit} className='search-form'>
        <input type='text' value={this.state.value} className='search' placeholder='Enter name...' onChange={this.onInputChange} />
        { this.state.suggestions.length === 0 && <button className='register-button'>Register</button> }
        <Suggestions suggestions={this.state.suggestions}
          toggleCheckIn={this.toggleCheckIn}
        />
      </form>
    )
  }
}

Typeahead.PropTypes = {
  push: React.PropTypes.func.isRequired
}

const TypeaheadWithRouter = withRouter(Typeahead)
export default TypeaheadWithRouter
