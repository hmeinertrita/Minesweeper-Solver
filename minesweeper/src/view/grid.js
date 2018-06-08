import React, { Component } from 'react';
import Game from '../game/game.js';
import './grid.css';

function Square(props) {
  if (props.value === -1) {
    return (
      <button className="board__row__square flagged" onClick={props.onClick}>
        <b>{"F"}</b>
      </button>
    );
  }
  else if (props.value === -2) {
    return (
      <button className="board__row__square mine" onClick={props.onClick}>
        <b>{"M"}</b>
      </button>
    );
  }
  else if (props.value === -3) {
    return (
      <button className="board__row__square incorrect" onClick={props.onClick}>
        <b>{"F"}</b>
      </button>
    );
  }
  else if (props.value === undefined) {
    return (
      <button className="board__row__square uncleared" onClick={props.onClick}></button>
    );
  }
  else {
    return (<button className="board__row__square cleared" onClick={props.onClick}>
      {props.value}
    </button>)
  }
}

class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: new Game(props.dim, props.mine_factor),
      clearing: true,
      changed: false,
    }
  }

  handleClick(i) {
    console.log("clicked " + i);
    this.setState({
      changed: true
    });
    if (this.state.game.isCleared(i) && this.state.game.getFlagsAround(i) === this.state.game.getStatus(i)) {
      const surroundings = this.state.game.getSurrounding(i);
      for(var j = 0; j < surroundings.length; j++) {
        this.state.game.clear(surroundings[j]);
      }
    }
    else if (this.state.clearing) {
      this.state.game.clear(i);
    }
    else {
      this.state.game.flag(i);
    }
  }

  render() {
    const board = [];
    for (var i=0; i<this.state.game.dim; i++) {
      const row = [];
      for (var j=0; j<this.state.game.dim; j++) {
        const idx = i*this.state.game.dim+j;
        var label = this.state.game.getStatus(idx);
        row.push(<Square key = {j} value = {label} onClick = {() => this.handleClick(idx)}/>);
      }
      board.push(<div className="board__row" key={i}>{row}</div>)
    }

    let status;
    if (this.state.clearing) {
      status = "Clearing";
    }
    else {
      status = "Flagging";
    }

    return (
      <div className="board">
        {board}
        <button onClick = {() => {
          this.setState({
            clearing: !this.state.clearing
          });
        }}>
          {status}
        </button>
        <button onClick = {() => {
          this.setState({
            game: new Game(this.props.dim, this.props.mine_factor)
          });
        }}>
          New Game
        </button>
      </div>
    );
  }
}

export default GridView;
