import React, {Component } from 'react'

class List extends Component {

    triggerMarker = (props) => {
        this.props.handleClick(props.id)
    }

    render() {
        const name = this.props.list.name
        
        return (
            <li
            className="my-item"
            role = "listItem"
            tabIndex={0}
            onClick={this.triggerMarker.bind(this, this.props.list)}>
                    {name}
            </li>
        )
    }
}

export default List