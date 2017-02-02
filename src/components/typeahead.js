import React, { Component } from 'react'
import { BrowserRouter as Router, withRouter } from 'react-router-dom'
import Suggestions from './suggestions'
import db from '../services/db'

class Typeahead extends Component {

  constructor (props) {
    super(props)
    this.state = {
      value: '',
      suggestions: [],
      people: db.getPeople()
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.handleCheckIn = this.handleCheckIn.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleCheckIn (personId) {
    db.checkIn(personId)
    const people = db.getPeople()
    this.setState({
      people: people
    })
  }

  handleSubmit (event) {
    // console.log(this.props)
    this.props.push(`/${this.state.value}`)
    event.preventDefault()
  }

  findMatches (name) {
    if (name) {
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
        <Suggestions suggestions={this.state.suggestions}
          handleCheckIn={this.handleCheckIn} />
      </form>
    )
  }
}

const TypeaheadWithRouter = withRouter(Typeahead)
export default TypeaheadWithRouter
