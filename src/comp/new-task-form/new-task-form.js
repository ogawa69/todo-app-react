import React, {Component} from "react";
import './new-task-form.css'

export default class NewTaskForm extends Component {
    state = {
        label: ''
    }

    labelChange = (e) => {
        this.setState({
            label: e.target.value
        }) 
    }

    submitForm = (e) => {
        e.preventDefault()
        this.props.addItem(this.state.label)
        this.setState({
            label: ''
        }) 
    }

    render() {
        return (
            <form onSubmit={this.submitForm}>
                <input className="new-todo" value={this.state.label} placeholder="What needs to be done?" onChange={this.labelChange} autoFocus />
            </form>
        )
    }
}