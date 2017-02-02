import React, { Component } from 'react';

class RegisterPage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      fields: {
        name: props.match.params.personName,
        email: ''
      }
    }

    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange (event) {
    const fields = this.state.fields
    fields[event.target.id] = event.target.value
    this.setState({
      fields: fields
    })
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='search-form'>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' value={this.state.fields.name} onChange={this.onInputChange} />
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' value={this.state.fields.email} onChange={this.onInputChange} />
      </form>
    );
  }
}

export default RegisterPage
