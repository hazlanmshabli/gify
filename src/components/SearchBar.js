import React from 'react';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = { search: ''}
    }
    onInputChange(search){
        this.setState({search});
        this.props.onSearchChange(search);
    }
    render(){
        return(
            <div className="search">
                <input placeholder="Enter text to search for gifs!" 
                       onChange={event => this.onInputChange(event.target.value)} 
                />
            </div>
        )
    }
}
export default SearchBar;