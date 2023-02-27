import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  state = {
    label: '',
    min: '',
    sec: '',
  }

  static propTypes = {
    addItem: PropTypes.func.isRequired,
  }

  labelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  timeChange = (e) => {
    if (Number(e.target.value) || e.target.value == '') {
      const type = e.target.placeholder === 'Min' ? ['min'] : ['sec']
      this.setState({
        [type]: e.target.value,
      })
    }
  }

  submitForm = (e) => {
    e.preventDefault()
    const { label, min, sec } = this.state
    const { addItem } = this.props

    if (label.length) {
      const time = min.length || sec.length ? this.props.formatTime(min, sec) : false

      addItem(label, time)
      this.setState({
        label: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    const { label, min, sec } = this.state
    return (
      <form className="new-todo-form" onSubmit={this.submitForm}>
        <input
          className="new-todo"
          value={label}
          placeholder="What needs to be done?"
          onChange={this.labelChange}
          autoFocus
        />
        <input className="new-todo-form__timer" placeholder="Min" value={min} onChange={this.timeChange} autoFocus />
        <input className="new-todo-form__timer" placeholder="Sec" value={sec} onChange={this.timeChange} autoFocus />
        <button type="submit" />
      </form>
    )
  }
}
