import React, { Component } from 'react';
import GridView from './view/grid.js';
import GameSettings from './view/GameSettings.js';
import Game from './game/game.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game:new Game(15, 0.2)
    };
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <GridView game = {this.state.game} />
        <GameSettings handleClick = {this.newGame.bind(this)} dim = {15} factor = {0.2}/>
      </div>
    );
  }

  newGame(dim, factor) {
    this.setState({
      game: new Game(dim, factor)
    });
  }


}

export default App;
