import React from "react";
import PropTypes from "prop-types";
import Task from "../task/task";
import './task-list.css'

function TaskList({todoData, deleteItem, toogleDone, editLabel, addItem}) {

    const elements = todoData.map(({id, ...item}) => {
        
        return (
            <Task key={id} {... item} toogleDone={() => toogleDone(id)} deleteItem={() => deleteItem(id)} editLabel={editLabel} addItem={addItem} />
        )
    })
    
    return (
        <ul className="todo-list">
            {elements}
        </ul>
    )
}

TaskList.defaultProps = {
    deleteItem: () => {},
    toogleDone: () => {},
    editItem: () => {},
    addItem: () => {}
}

TaskList.propTypes = {
    todoData: PropTypes.array,
    deleteItem: PropTypes.func,
    toogleDone: PropTypes.func,
    editItem: PropTypes.func,
    addItem: PropTypes.func
}

export default TaskList