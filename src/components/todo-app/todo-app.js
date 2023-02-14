import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'

import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

import './todo-app.css'

export default class TodoApp extends Component {
  state = {
    todoData: [],
  }

  componentDidMount() {
    const prevData = JSON.parse(localStorage.getItem('todoData'))
    if (prevData) {
      const result = prevData.map((el) => {
        return { ...el, time: new Date(el.time) }
      })
      this.setState({
        todoData: result,
      })
    }
  }

  createTodoItem(label) {
    return {
      label,
      time: new Date(),
      done: false,
      class: 'active',
      hidden: false,
      id: uuidv4(),
      checked: false,
    }
  }

  addToLocalStorage = (data) => {
    localStorage.setItem('todoData', JSON.stringify(data))
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const result = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      this.addToLocalStorage(result)
      return { todoData: result }
    })
  }

  addItem = (text) => {
    const newItem = this.createTodoItem(text)

    this.setState(({ todoData }) => {
      let result = [...todoData, newItem]
      this.addToLocalStorage(result)
      return {
        todoData: result,
      }
    })
  }

  toogleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)

      const oldItem = todoData[idx]
      const classItem = classNames({ completed: oldItem.class === 'active', active: oldItem.class === 'completed' })

      const newItem = { ...oldItem, done: !oldItem.done, class: classItem }
      const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)]
      this.addToLocalStorage(newArray)
      return {
        todoData: newArray,
      }
    })
  }

  clearDone = (items) => {
    const ids = items.map((el) => el.id)
    ids.forEach((element) => {
      this.deleteItem(element)
    })
    this.addToLocalStorage(this.state)
  }

  editLabel = (id, newLabel) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((el) => (el.id === id ? { ...el, label: newLabel } : el))
      this.addToLocalStorage(newArray)
      return {
        todoData: newArray,
      }
    })
  }

  filterTodo = (label) => {
    this.setState(({ todoData }) => {
      const actions = {
        all: 'All',
        active: 'Active',
        completed: 'Completed',
      }
      if (label === actions.all) {
        const newArray = todoData.map((el) => (el.hidden ? { ...el, hidden: false } : el))

        return {
          todoData: newArray,
        }
      }
      if (label === actions.active) {
        const newArray = todoData.map((el) => {
          if (el.class === 'active') {
            return { ...el, hidden: false }
          }

          return { ...el, hidden: true }
        })

        return {
          todoData: newArray,
        }
      }
      if (label === actions.completed) {
        const newArray = todoData.map((el) => {
          if (el.class === 'active') {
            return { ...el, hidden: true }
          }

          return { ...el, hidden: false }
        })

        return {
          todoData: newArray,
        }
      }
    })
  }

  render() {
    const { todoData } = this.state
    const doneItems = todoData.filter((el) => el.done)
    const countItems = todoData.length - doneItems.length

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todoData={todoData}
            toogleDone={this.toogleDone}
            deleteItem={this.deleteItem}
            editLabel={this.editLabel}
          />
          <Footer countItems={countItems} clearDone={() => this.clearDone(doneItems)} filterTodo={this.filterTodo} />
        </section>
      </section>
    )
  }
}
