import React, {Component} from 'react'
import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'
import './todo-app.css'

export default class TodoApp extends Component {

    maxId = 0

    state = {
        todoData: [
            this.createTodoItem("Seeping green tea"),
            this.createTodoItem("Learn React"),
            this.createTodoItem("Create React App")
        ]
    }

    createTodoItem(label) {
        return {
            label,
            done: false,
            class: 'active',
            hidden: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id)
            const result = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ]
            return {todoData: result}
        })
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text)

        this.setState(({todoData}) => {
            let copy = [...todoData, newItem]
            return {
                todoData: copy
            }
        })
    }

    toogleDone = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id)

            const oldItem = todoData[idx]
            let classItem = ''
            if (oldItem.class === 'active') {
                classItem = 'completed'
            } else {
                classItem = 'active'
            }
            const newItem = {...oldItem, done: !oldItem.done, class: classItem}
            
            const newArray = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx + 1)
            ]
            
            return {
                todoData: newArray
            }
        })
    }

    clearDone = (items) => {
        const ids = items.map((el) => el.id)
        ids.forEach(element => {
            this.deleteItem(element)
        });
    }

    filterTodo = (label) => {
        this.setState(({todoData}) => {
            if (label === 'All') {
                const updatedCopy = todoData.map((el) => el.hidden ? {...el, hidden: false} : el)
                
                return {
                    todoData: updatedCopy
                }
            }
            if (label === 'Active') {
                const updatedCopy = todoData.map((el) => {
                    
                    if (el.class === 'active') {
                        return {...el, hidden: false}
                    }
                    
                    return {...el, hidden: true}
                })

                return {
                    todoData: updatedCopy
                }
            }
            if (label === 'Completed') {
                const updatedCopy = todoData.map((el) => {
                    
                    if (el.class === 'active') {
                        return {...el, hidden: true}
                    }
                    
                    return {...el, hidden: false}
                })
                
                return {
                    todoData: updatedCopy
                }
            }
        })
    }

    render() {
        const {todoData} = this.state
        const doneItems = todoData.filter((el) => el.done)
        const countItems = doneItems.length
        
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm addItem={this.addItem}/>
                </header>
                <section className="main">
                    <TaskList todoData={todoData} toogleDone={this.toogleDone} deleteItem={this.deleteItem} />
                    <Footer todoData={todoData} countItems={countItems} clearDone={() => this.clearDone(doneItems)} filterTodo={this.filterTodo} />
                </section>
            </section>
        )
    }
}