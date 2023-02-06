import React from "react";
import './todo-list-item.css'

const TodoListItem = ({ label, important = false }) => {
    const style = {
        color: important ? 'blue' : 'black',
        fontWeight: important ? 'bold' : 'normal'
    }

    return (
        <div class="view">
            <input class="toggle" type="checkbox" />
            <label>
                <span class="description">Completed task</span>
                <span class="created">created 17 seconds ago</span>
            </label>
            <button class="icon icon-edit"></button>
            <button class="icon icon-destroy"></button>
        </div>
    )
}

export default TodoListItem