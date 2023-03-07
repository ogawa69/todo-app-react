import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

const NewTaskForm = ({ formatTime, addItem }) => {
  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const labelChange = (e) => {
    setLabel(e.target.value)
  }

  const timeChange = (e) => {
    if (Number(e.target.value) || e.target.value == '') {
      return e.target.placeholder === 'Min' ? setMin(e.target.value) : setSec(e.target.value)
    }
  }

  const submitForm = (e) => {
    e.preventDefault()

    if (label.length) {
      const time = min.length || sec.length ? formatTime(min, sec) : false
      addItem(label, time)
      setLabel('')
      setMin('')
      setSec('')
    }
  }

  return (
    <form className="new-todo-form" onSubmit={submitForm}>
      <input className="new-todo" value={label} placeholder="What needs to be done?" onChange={labelChange} autoFocus />
      <input className="new-todo-form__timer" placeholder="Min" value={min} onChange={timeChange} autoFocus />
      <input className="new-todo-form__timer" placeholder="Sec" value={sec} onChange={timeChange} autoFocus />
      <button type="submit" />
    </form>
  )
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}

export default NewTaskForm
