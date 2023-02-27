import React from 'react'
import PropTypes from 'prop-types'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './task.css'
import classNames from 'classnames'

export default class Task extends React.Component {
  state = {
    value: '',
    editing: false,
  }

  static defaultProps = {
    done: false,
    hidden: false,
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    done: PropTypes.bool,
    hidden: PropTypes.bool,
  }

  timeToNow = () => {
    return formatDistanceToNow(this.props.time)
  }

  onEditForm = () => {
    this.setState(({ editing }) => {
      return {
        value: this.props.label,
        editing: !editing,
      }
    })
  }

  labelChange = (e) => {
    this.setState(({ editing }) => {
      return {
        value: e.target.value,
        editing: editing,
      }
    })
  }

  onEditTask = (e) => {
    e.preventDefault()
    const { value } = this.state
    if (value.length) {
      const { id, editLabel } = this.props
      editLabel(id, value)
      this.setState(({ value, editing }) => {
        return {
          value: value,
          editing: !editing,
        }
      })
    }
  }

  render() {
    const { label, done, hidden, toogleDone, deleteItem, timerValue, timerPlay, timerStop } = this.props
    const { value, editing } = this.state

    const liClassNames = classNames({ completed: done, active: !done }, { hidden: hidden }, { editing: editing })
    const formClassNames = classNames({ hidden: !editing })
    const timerClassNames = classNames('description', { hidden: timerValue === '00:00' || !timerValue })

    return (
      <li className={liClassNames}>
        <div className="view">
          <input className="toggle" type="checkbox" onClick={toogleDone} defaultChecked={done} />
          <label>
            <span className="title">{label}</span>
            <span className={timerClassNames}>
              <button className="icon icon-play" onClick={timerPlay}></button>
              <button className="icon icon-pause" onClick={timerStop}></button>
              <span className="timer">{timerValue}</span>
            </span>
            <span className="created">{'created ' + this.timeToNow() + ' ago'}</span>
          </label>
          <button className="icon icon-edit" onClick={this.onEditForm}></button>
          <button className="icon icon-destroy" onClick={deleteItem}></button>
        </div>
        <form className={formClassNames} onSubmit={this.onEditTask}>
          <input type="text" className="edit" value={value} onChange={this.labelChange}></input>
        </form>
      </li>
    )
  }
}
