import React from "react";
import AppHeader from "../header";
import SearchPanel from "../new-todo";
import TodoList from "../todo-list";
import ItemFilter from "../item-filter";
import './todo-app.css'

const App = () => {
    const todoItems = [
        {label: 'Learn React', important: false, id: 1},
        {label: 'Create React app', important: true, id: 2},
        {label: 'Meditation', important: false, id: 3}
    ]

    return (
        <div className="container">
            <AppHeader toDo={1} done={2}/>
            <div className="search-panel">
                <SearchPanel />
                <ItemFilter />
            </div>
            <TodoList todos={todoItems}/>
        </div>
    )
};

export default App