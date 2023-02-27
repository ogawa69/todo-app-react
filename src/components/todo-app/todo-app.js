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

  componentDidUpdate() {
    this.addToLocalStorage(this.state.todoData)
  }

  createTodoItem(label, timer) {
    return {
      label,
      timerValue: timer,
      timerOn: false,
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

  editState = (id, key, value) => {
    this.setState(({ todoData }) => {
      const newArray = todoData.map((el) => (el.id === id ? { ...el, [key]: value } : el))
      return {
        todoData: newArray,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const result = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
      return { todoData: result }
    })
  }

  addItem = (text, timer) => {
    const newItem = this.createTodoItem(text, timer)

    this.setState(({ todoData }) => {
      let result = [...todoData, newItem]
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
  }

  editLabel = (id, newLabel) => {
    this.editState(id, 'label', newLabel)
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

  formatTime = (min, sec) => {
    const formatMin = min.length > 1 ? min : `0${min.length ? min : 0}`
    const formatSec = sec.length > 1 ? sec : `0${sec.length ? sec : 0}`
    return `${formatMin}:${formatSec}`
  }

  countDown = (time) => {
    const [strMin, strSec] = time.split(':')
    const min = Number(strMin)
    const sec = Number(strSec)

    if ((min || !min) && sec) {
      return this.formatTime(`${min}`, `${sec - 1}`)
    }
    if (min && !sec) {
      return this.formatTime(`${min - 1}`, '59')
    }
    if (!min && !sec) {
      return false
    }
  }

  timer(id) {
    const timer = setInterval(() => {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)

        const item = { ...todoData[idx] }
        if (!item.timerOn) {
          return clearInterval(timer)
        }
        if (item.timerValue !== '00:00') {
          item.timerValue = this.countDown(String(item.timerValue))
          const newArr = [...todoData.slice(0, idx), item, ...todoData.slice(idx + 1)]
          return {
            todoData: newArr,
          }
        }
      })
    }, 1000)
  }

  toggleTimer = (id, value) => {
    this.editState(id, 'timerOn', value)
  }

  timerPlay = (id) => {
    const { todoData } = this.state
    const idx = todoData.findIndex((el) => el.id === id)
    if (!todoData[idx].timerOn) {
      this.toggleTimer(id, true)
      this.timer(id)
    }
  }

  timerStop = (id) => {
    this.toggleTimer(id, false)
  }

  render() {
    const { todoData } = this.state
    const doneItems = todoData.filter((el) => el.done)
    const countItems = todoData.length - doneItems.length
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm addItem={this.addItem} formatTime={this.formatTime} />
        </header>
        <section className="main">
          <TaskList
            todoData={todoData}
            toogleDone={this.toogleDone}
            deleteItem={this.deleteItem}
            editLabel={this.editLabel}
            timerPlay={this.timerPlay}
            timerStop={this.timerStop}
          />
          <Footer countItems={countItems} clearDone={() => this.clearDone(doneItems)} filterTodo={this.filterTodo} />
        </section>
      </section>
    )
  }
}
