import React from "react";
import PropTypes from "prop-types";
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import './task.css'

export default class Task extends React.Component {

  state = {
    label: this.props.label,
    editing: false
  }

  static defaultProps = {
    done: false,
    hidden: false
  }

  static propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    done: PropTypes.bool,
    hidden: PropTypes.bool
  }

  timeToNow = () => {
    return formatDistanceToNow(this.props.time)
  }
  
  createForm = () => {
    this.setState(({label, editing}) => {
      return {
        label: label,
        editing: !editing
      }
    })
  }

  labelChange = (e) => {
      this.setState(({editing}) => { 
        return {
          label: e.target.value,
          editing: editing
        }
      }) 
  }

  editTask = (e) => {
    e.preventDefault()

    if (this.state.label.length) {
      this.props.editLabel(this.props.id, this.state.label)
      this.setState(({label, editing}) => { 
        return {
          label: label,
          editing: !editing
        }
      }) 
    }
  }

  render() {
    const {label, done, hidden, toogleDone, deleteItem} = this.props

    let className = ''
    if (done) {
      className = 'completed'
    } else {
      className = 'active'
    }

    let classHidden = ''
    if (hidden) {
      classHidden = ' hidden'
    } else {
      classHidden = ''
    }

    let classEditing = this.state.editing ? ' editing' : ''

    return (
      <li className={className + classHidden + classEditing}>
          <div className={"view"}>
            <input className="toggle" type="checkbox" onClick={toogleDone} />
            <label>
              <span className="description">{label}</span>
              <span className="created">{'created ' + this.timeToNow() + ' ago'}</span>
            </label>
            <button className="icon icon-edit" onClick={this.createForm}></button>
            <button className="icon icon-destroy" onClick={deleteItem}></button>
          </div>
          <form className={this.state.editing ? '' : 'hidden'} onSubmit={this.editTask} >
            <input type="text" className="edit" value={this.state.label} onChange={this.labelChange}></input>
          </form>
      </li>
  )
  }
}