import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../tasks-filter/task-filter'
import './footer.css'

export default class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: [
        { label: 'All', id: 1, selected: true },
        { label: 'Active', id: 2, selected: false },
        { label: 'Completed', id: 3, selected: false },
      ],
    }
  }

  static defaultProps = {
    countItems: 0,
    clearDone: () => {},
  }

  static propTypes = {
    countItems: PropTypes.number,
    clearDone: PropTypes.func,
  }

  toggleSelected = (id) => {
    this.setState(({ filters }) => {
      const updatedCopy = filters.map((el) => (el.selected ? { ...el, selected: false } : el))

      const idx = updatedCopy.findIndex((el) => el.id === id)
      const newArray = updatedCopy.map((el, i) => (idx === i ? { ...el, selected: true } : el))

      return {
        filters: newArray,
      }
    })
  }

  changeFilter = (id, label) => {
    this.toggleSelected(id)
    this.props.filterTodo(label)
  }

  render() {
    const { countItems, clearDone } = this.props

    const elements = this.state.filters.map(({ id, label, selected }) => {
      return <TaskFilter key={id} label={label} selected={selected} changeFilter={() => this.changeFilter(id, label)} />
    })

    return (
      <footer className="footer">
        <span className="todo-count">{countItems} items left</span>
        <ul className="filters">{elements}</ul>
        <button className="clear-completed" onClick={clearDone}>
          Clear completed
        </button>
      </footer>
    )
  }
}
