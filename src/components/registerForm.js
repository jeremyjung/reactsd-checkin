import React, { Component } from 'react';
import Field from './field'

class RegisterForm extends Component {
  constructor (props) {
    super(props)

    this.state = {
      fields: {
        name: props.name,
        email: ''
      },
      fieldErrors: {},
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onFormSubmit = this.onFormSubmit.bind(this)
  }

  onInputChange ({ name, value, error }) {
    const fields = this.state.fields
    const fieldErrors = this.state.fieldErrors

    fields[name] = value
    fieldErrors[name] = error

    this.setState({ fields, fieldErrors })
  }

  onFormSubmit (event) {
    event.preventDefault()
    if (this.validate()) return

    const person = this.state.fields
    this.props.registerPerson(person)
  }

  isValidEmail(email) {
    const emailRegex = /\S+@\S+\.\S+/
    return emailRegex.test(email)
  }

  validate() {
    const person = this.state.fields
    const fieldErrors = this.state.fieldErrors
    const errMessages = Object.keys(fieldErrors).filter(k => fieldErrors[k])

    if (!person.name) return true
    if (!person.email) return true
    if (errMessages.length) return true

    return false
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className='search-form'>
        <label htmlFor='name'>Name</label>
        <Field
          placeholder='Name'
          name='name'
          type='text'
          value={this.state.fields.name}
          onChange={this.onInputChange}
          validate={(val) => (val ? false : 'Name Required')}
        />
        <label htmlFor='email'>Email</label>
        <Field
          placeholder='Email'
          name='email'
          type='email'
          value={this.state.fields.email}
          onChange={this.onInputChange}
          validate={val => this.isValidEmail(val) ? false : 'Invalid Email'}
        />

        <button className='register-button' type='submit' disabled={this.validate()}>Register</button>
      </form>
    );
  }
}

RegisterForm.PropTypes = {
  name: React.PropTypes.string.isRequired,
  registerPerson: React.PropTypes.object.isRequired
}

export default RegisterForm
