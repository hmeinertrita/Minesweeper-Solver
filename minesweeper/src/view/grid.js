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
      clearing: true,
      changed: false,
    }
  }

  handleClick(i) {
    console.log("clicked " + i);
    this.setState({
      changed: true
    });
    if (this.props.game.isCleared(i) && this.props.game.getFlagsAround(i) === this.props.game.getStatus(i)) {
      const surroundings = this.props.game.getSurrounding(i);
      for(var j = 0; j < surroundings.length; j++) {
        this.props.game.clear(surroundings[j]);
      }
    }
    else if (this.state.clearing) {
      this.props.game.clear(i);
    }
    else {
      this.props.game.flag(i);
    }
  }

  render() {
    const board = [];
    for (var i=0; i<this.props.game.dim; i++) {
      const row = [];
      for (var j=0; j<this.props.game.dim; j++) {
        const idx = i*this.props.game.dim+j;
        var label = this.props.game.getStatus(idx);
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
        <div className="gameInfo">
          {"Mines Remaining: " + (this.props.game.mine_count - this.props.game.getFlagCount())}
        </div>
      </div>
    );
  }
}

export default GridView;
