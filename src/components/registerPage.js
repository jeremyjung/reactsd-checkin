import React, { Component } from 'react'
import RegisterForm from './RegisterForm'
import { withRouter } from 'react-router-dom'
import base from '../base'

class RegisterPage extends Component {

  constructor(props) {
    super(props)

    this.registerPerson = this.registerPerson.bind(this)
  }

  registerPerson (person) {
    base.push('members', {
      data: {
        name: person.name,
        email: person.email,
        checkedIn: true
      }
    })
    this.props.push(`/register/complete/${person.name}`)
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
  match: React.PropTypes.object.isRequired
}

const RegisterPageWithRouter = withRouter(RegisterPage)
export default RegisterPageWithRouter
