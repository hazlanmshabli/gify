import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import GifList from './components/GifList';
import request from 'superagent';
import './styles/app.css';
import GifModal from './components/GifModal';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      gifs: [],
      selectedGif: null,
      modalIsOpen: false      
    }
  }

  openModal(gif){
    this.setState({
      modalIsOpen: true,
      selectedGif: gif
    });
  }

  closeModal(){
    this.setState({
      modalIsOpen: false,
      selectedGif: null
    });
  }

  handleSearchChange(search){
    const url = `http://api.giphy.com/v1/gifs/search?q=${search.replace(/\s/g, '+')}&api_key=dc6zaTOxFJmzC`;

    request.get(url, (err, res) => {
      this.setState({ gifs: res.body.data })
    });
  }
  render() {
    return (
      <div>
        <SearchBar onSearchChange={search => this.handleSearchChange(search)} />
        <GifList gifs={this.state.gifs} onGifSelect={selectedGif => this.openModal(selectedGif) } />
        <GifModal modalIsOpen={this.state.modalIsOpen}
                  selectedGif={this.state.selectedGif}
                  onRequestClose={ () => this.closeModal() } />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));