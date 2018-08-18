import React, {Component } from 'react'

class FilterSearch extends Component {
    constructor(props) {
        super(props);
        this.handleTextInput = this.handleTextInput.bind(this)
    }


    handleTextInput(event){
        this.props.onFilterInput(event.target.value)
        this.props.handleTextInput(event.target.value);
    }

    render() {
        return(
            <div className="filterSearch">
                <input 
                    className = "input"
                    role = "FilterTextInput"
                    aria-label = "FilterTextInput"
                    tabIndex = {0}
                    type = "text"
                    placeholder = "Search for new places"
                    value = {this.props.filterInput}
                    onChange = {this.handleTextInput}
                    //value = {this.state.places}
                    //onChange = {this.update}

                />
            </div>
        )
    }

}

export default FilterSearch