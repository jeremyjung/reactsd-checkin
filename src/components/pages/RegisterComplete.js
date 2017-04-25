import React from 'react'
import PropTypes from 'prop-types'

const RegisterComplete = ({match}) => (
  <span className='register-complete-form'>Thanks for registering {match.params.personName}!</span>
)

RegisterComplete.PropTypes = {
  name: PropTypes.string.isRequired
}

export default RegisterComplete
