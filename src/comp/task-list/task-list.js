import React from "react";
import Task from "../task/task";
import './task-list.css'

const TaskList = ({todoData, deleteItem, toogleDone}) => {

    const elements = todoData.map(({id, ...item}) => {
        
        return (
            <Task key={id} {... item} toogleDone={() => toogleDone(id)} deleteItem={() => deleteItem(id)} />
        )
    })
    
    return (
        <ul className="todo-list">
            {elements}
        </ul>
    )
}

export default TaskList