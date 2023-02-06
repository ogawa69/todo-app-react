import React from "react";

export default class Task extends React.Component {

  render() {
    const {label, done, hidden, id, toogleDone, deleteItem} = this.props

    let className = ''
    if (done) {
      className = 'completed'
    } else {
      className = 'active'
    }

    let classHidden = ''
    if (hidden) {
      classHidden = ' hidden'
    } else {
      classHidden = ''
    }
    
    return (
      <li className={className + classHidden}>
          <div className="view">
            <input key={id} className="toggle" type="checkbox" onClick={toogleDone} />
            <label htmlFor={id}>
              <span className="description">{label}</span>
              <span className="created">created 17 seconds ago</span>
            </label>
            <button className="icon icon-edit"></button>
            <button className="icon icon-destroy" onClick={deleteItem}></button>
          </div>
      </li>
  )
  }
}