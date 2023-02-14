import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
  }

  static propTypes = {
    addItem: PropTypes.func.isRequired,
  }

  labelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  submitForm = (e) => {
    e.preventDefault()
    const { label } = this.state
    const { addItem } = this.props

    if (label.length) {
      addItem(label)
      this.setState({
        label: '',
      })
    }
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input
          className="new-todo"
          value={this.state.label}
          placeholder="What needs to be done?"
          onChange={this.labelChange}
          autoFocus
        />
      </form>
    )
  }
}
