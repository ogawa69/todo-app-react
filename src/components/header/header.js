import React from "react";
import NewTodo from "../new-todo";
import './header.css'

const Header = ({ toDo, done }) => {
    return (
        <div className="header">
            <h1>My Todo List</h1>
            <NewTodo />
        </div>
    );
}

export default Header