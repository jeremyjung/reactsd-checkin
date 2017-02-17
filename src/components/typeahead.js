import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Suggestions from './Suggestions'
import db from '../services/db'

class Typeahead extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: '',
      suggestions: [],
      people: []
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.handleCheckIn = this.handleCheckIn.bind(this)
    this.handleCheckOut = this.handleCheckOut.bind(this)
    this.handleRegistration = this.handleRegistration.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount() {
    this.setState({
      people: db.getPeople()
    })
  }

  handleCheckIn (personId) {
    db.checkInPersonById(personId)
    this.setState({
      people: db.getPeople()
    })
  }

  handleCheckOut (personId) {
    db.checkOutPersonById(personId)
    this.setState({
      people: db.getPeople()
    })
  }

  handleRegistration (name) {
    this.props.push(`/register/${name}`)
  }

  handleSubmit (event) {
    if (this.state.suggestions.length === 0) {
      this.handleRegistration(this.state.value)
    }
    else if (this.state.suggestions.length > 0 && !this.state.suggestions[0].checkedIn) {
      this.handleCheckIn(this.state.suggestions[0].id)
    }
    else {
      this.handleCheckOut(this.state.suggestions[0].id)
    }
    event.preventDefault()
  }

  findMatches (name) {
    if (name && name.length > 2) {
      return this.state.people.filter(person => {
        const regex = new RegExp(name, 'gi')
        return person.name.match(regex)
      })
    } else return []
  }

  onInputChange (event) {
    const value = event.target.value
    const suggestions = this.findMatches(value)
    this.setState({
      value: value,
      suggestions: suggestions
    })
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
