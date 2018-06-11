import React, { Component } from 'react';

class GameSettings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value:"",
      dim:props.dim,
      factor:props.factor,
    };
  }

  updateDim(evt) {
    this.setState({
      dim: parseInt(evt.target.value),
    });
  }

  updateFactor(evt) {
    this.setState({
      factor: parseFloat(evt.target.value),
    });
  }

  render() {
    return (
      <div>
        <button onClick = {() => {this.props.handleClick(this.state.dim, this.state.factor)}}>
          New Game
        </button>

        <div>
          Board Size:
          <input onChange = {evt => {this.updateDim(evt)}} value = {this.state.dim} size = "6" type = "number"/>
        </div>

        <div>
          Mine Percentage (0 - 1):
          <input onChange = {evt => {this.updateFactor(evt)}} value = {this.state.factor} size = "6" type = "number"/>
        </div>

      </div>
    );
  }
}

export default GameSettings;
