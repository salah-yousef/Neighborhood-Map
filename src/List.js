import React, {Component } from 'react'

class List extends Component {

    triggerMarker = (props) => {
        this.props.handleClick(props.id)
    }

    render() {
        const name = this.props.list.name
        
        return (
            <ul
            role = "listItem"
            tabIndex={0}
            onClick={this.triggerMarker.bind(this, this.props.list)}>
                <li>
                    {name}
                </li>
            </ul>
        )
    }
}

export default List