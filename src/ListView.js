import React, {Component } from 'react'
import List from './List'

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredPlaces: []
        }
    }
    
   

    
    render() {
        const myStack = [];
        const items = this.props.items
        const filterInput = this.props.filterInput;

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
            <ul>
                {myStack}     
            </ul>
          );

    }

} 



export default ListView