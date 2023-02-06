import React from "react";
import './task-filter.css'

const TaskFilter = ({label, selected, changeFilter}) => {
    return (
        <li>
            <button className={selected ? 'selected' : ''} onClick={changeFilter}>{label}</button>
        </li>
    )
}

export default TaskFilter