import React, {Component } from 'react'
import List from './List'

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredPlaces: []
        }
    }
    
    update = (e) => {
        console.log(e);
        
        console.log(e.target.value);
        this.props.onUpdate(e.target.value);
        this.setState({filteredPlaces: e.target.value});
    }

    
    render() {
        const myStack = [];
        const items = this.props.items
        const filterInput = this.props.filterInput;
        console.log(items);

        items.map((item) => {
            if (item.name.toLowerCase().indexOf(filterInput.toLowerCase()) === -1) {
                return;
              }
        
            item.isVisible = true;
            myStack.push(
                <List
                    key = {item.id}
                    list = {item}
                    handleClick={this.props.itemClicked}
                />

            )
        });

        return (
            <div>
                {myStack}     
            </div>
          );

    }

} 



export default ListView