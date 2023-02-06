import React from "react";
import './item-filter.css'

const ItemFilter = () => {
    return (
        <div className="search-panel__button-group">
            <button type="button" className="btn btn-info search-panel__btn">All</button>
            <button type="button" className="btn btn-outline-secondary search-panel__btn">Active</button>
            <button type="button" className="btn btn-outline-secondary search-panel__btn">Done</button>
        </div>
    )
}

export default ItemFilter