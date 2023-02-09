import React from "react";
import PropTypes from "prop-types";
import Task from "../task/task";
import './task-list.css'

function TaskList({todoData, deleteItem, toogleDone, editLabel}) {

    const elements = todoData.map(({id, ...item}) => {
        
        return (
            <Task key={id} id={id} {... item} toogleDone={() => toogleDone(id)} deleteItem={() => deleteItem(id)} editLabel={editLabel} />
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
    editLabel: () => {}
}

TaskList.propTypes = {
    todoData: PropTypes.array,
    deleteItem: PropTypes.func,
    toogleDone: PropTypes.func,
    editLabel: PropTypes.func
}

export default TaskList