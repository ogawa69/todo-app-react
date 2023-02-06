import React, {Component} from "react";
import TaskFilter from "../tasks-filter/task-filter";
import './footer.css'

export default class Footer extends Component {
    state = {
        filters: [
            {label: 'All', class: '', id: 1, selected: false},
            {label: 'Active', class: 'active', id: 2, selected: false},
            {label: 'Completed', class: 'completed', id: 3, selected: false}
        ]
    }

    toggleSelected = (id) => {
        this.setState(({filters}) => {
            const updatedCopy = filters.map((el) => el.selected ? {...el, selected: false} : el)

            const idx = updatedCopy.findIndex((el) => el.id === id)
            const newArray = updatedCopy.map((el, i) => idx === i ? {...el, selected: true} : el)

            return {
                filters: newArray
            }
        })
    }

    changeFilter = (id, label) => {
        this.toggleSelected(id)
        this.props.filterTodo(label)
    }

    render() {
        const {countItems, todoData, clearDone} = this.props

        const elements = this.state.filters.map(({id, label}) => {
            return (
                <TaskFilter key={id} label={label} changeFilter={() => this.changeFilter(id, label)} />
            )
        })

        return (
            <footer className="footer">
                <span className="todo-count">{countItems} items left</span>
                <ul className="filters">
                    {elements}
                </ul>
                <button className="clear-completed" onClick={clearDone}>Clear completed</button>
            </footer>
        )
    }
}