import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RegisterForm from '../RegisterForm'
import { withRouter } from 'react-router-dom'
import base from '../../base'

class RegisterPage extends Component {

  constructor(props) {
    super(props)

    this.registerPerson = this.registerPerson.bind(this)
  }

  registerPerson (person) {
    const result = base.push('members', {
      data: {
        name: person.name,
        checkedIn: true
      }
    })
    base.update(`protectedMembers/${result.key}`, {
      data: { email: person.email }
    })
    this.props.history.push(`/register/complete/${person.name}`)
  }

  render() {
    return (
        <RegisterForm
        name={this.props.match.params.personName}
        registerPerson={this.registerPerson} />
    )
  }
}

RegisterPage.PropTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

const RegisterPageWithRouter = withRouter(RegisterPage)
export default RegisterPageWithRouter
