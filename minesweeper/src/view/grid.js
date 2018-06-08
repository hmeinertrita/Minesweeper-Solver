import React, { Component } from 'react';
import Game from '../game/game.js';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class GridView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: this.props.game,
      clearing: true,
      changed: false,
    }
  }

  render() {
    //if (this.state.changed) {
    //  this.setState({
    //    changed: false
    //  });
    //}

    const board = [];
    for (var i=0; i<this.state.game.dim; i++) {
      const row = [];
      for (var j=0; j<this.state.game.dim; j++) {
        const idx = i*this.state.game.dim+j;
        var label = this.state.game.getNum(idx);
        if (label === -1) {
          label = 'F';
        }
        if (label === undefined) {
          label = " ";
        }
        row.push(<Square key = {j} value = {label} onClick = {() => {
          this.setState({
            changed: true
          });
          if (this.state.clearing) {
            this.state.game.clear(idx);
          }
          else {
            this.state.game.flag(idx);
          }
        }}/>);
      }
      board.push(<div className="board-row" key={i}>{row}</div>)
    }

    let status;
    if (this.state.clearing) {
      status = "Clearing";
    }
    else {
      status = "Flagging";
    }

    return (
      <div className="Game">
        {board}
        <button onClick = {() => {
          this.setState({
            clearing: !this.state.clearing
          });
        }}>
          {status}
        </button>
      </div>
    );
  }
}

export default GridView;
