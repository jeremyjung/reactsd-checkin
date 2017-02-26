import React, { Component } from 'react';

class Field extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
      error: false
    }

    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps(update) {
    this.setState({ value: update.value })
  }

  onChange(event) {
    const name = this.props.name
    const value = event.target.value
    const error = this.props.validate ? this.props.validate(value) : false

    this.setState({ value, error })

    this.props.onChange({ name, value, error })
  }

  render() {
    return (
      <div>
        <input
          id={this.props.name}
          placeholder={this.props.placeholder}
          type={this.props.type}
          value={this.state.value}
          onChange={this.onChange}
        />
        <span className='validation-error'> { this.state.error } </span>
      </div>
    );
  }
}

Field.PropTypes = {
  placeholder: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.string,
  validate: React.PropTypes.func,
  onChange: React.PropTypes.func.isRequired
}

export default Field
