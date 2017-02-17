import React, { Component } from 'react'
import RegisterForm from './RegisterForm'
import { withRouter } from 'react-router-dom'
import db from '../services/db'

class RegisterPage extends Component {

  constructor(props) {
    super(props)

    this.registerPerson = this.registerPerson.bind(this)
  }

  registerPerson (person) {
    db.registerPerson(person)
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
