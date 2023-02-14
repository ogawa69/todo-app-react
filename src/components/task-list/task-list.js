import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Task from '../task/task'
import './task-list.css'

function TaskList({ todoData, deleteItem, toogleDone, editLabel }) {
  const elements = todoData.map(({ id, ...item }) => {
    return (
      <Task
        key={id}
        id={id}
        {...item}
        toogleDone={() => toogleDone(id)}
        deleteItem={() => deleteItem(id)}
        editLabel={editLabel}
      />
    )
  })

  const emptyClassName = classNames('todo-list__empty', { hidden: todoData.length })

  return (
    <ul className="todo-list">
      {elements}
      <li className={emptyClassName}>Todos is empty...</li>
    </ul>
  )
}

TaskList.defaultProps = {
  deleteItem: () => {},
  toogleDone: () => {},
  editLabel: () => {},
}

TaskList.propTypes = {
  todoData: PropTypes.array,
  deleteItem: PropTypes.func,
  toogleDone: PropTypes.func,
  editLabel: PropTypes.func,
}

export default TaskList
