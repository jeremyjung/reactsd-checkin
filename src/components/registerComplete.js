import React from 'react'

const RegisterComplete = ({match}) => (
  <span className='register-complete-form'>Thanks for registering {match.params.personName}!</span>
)

RegisterComplete.PropTypes = {
  name: React.PropTypes.string.isRequired
}

export default RegisterComplete
