import React, { Component } from 'react';
import GridView from './view/grid.js';
import Game from './game/game.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <GridView dim = {10} mine_factor={0.2} />
      </div>
    );
  }
}

export default App;
