import React, {Component } from 'react'
import ListView from './ListView'
import FilterSearch from './FilterSearch'
import './App.css'


class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textInput: ''
        }
        this.handleTextInput = this.handleTextInput.bind(this);
    }

    handleTextInput(textInput) {
        this.setState({textInput});
        this.props.filterMarkers(textInput);
    }
    
    render () {
        return (
            <div className="App-sidebar">
                <FilterSearch
                    filterInput = {this.state.textInput}
                    handleTextInput = {this.handleTextInput.bind(this)}
                    onFilterInput = {this.props.itemClicked}
                />
                <div className="my-list">
                    <ListView
                        items = {this.props.items}
                        itemClicked = {this.props.itemClicked}
                        filterInput = {this.state.textInput}
                        onUpdate = {this.props.onUpdate}
                    />
                </div>
            </div>
        )
    }
}

export default Sidebar
