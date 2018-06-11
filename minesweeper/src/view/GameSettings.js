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
    var d = parseInt(evt.target.value);
    this.setState({
      dim: d<0 ? 0:d,
    });
  }

  updateFactor(evt) {
    var f = parseFloat(evt.target.value);
    f = f>1 ? 1:f;
    this.setState({
      factor: f<0 ? 0:f,
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
          <input
            onChange = {evt => {this.updateDim(evt)}}
            value = {this.state.dim}
            type = "number"
          />
        </div>

        <div>
          Mine Percentage (0 - 1):
          <input
            onChange = {evt => {this.updateFactor(evt)}}
            value = {this.state.factor}
            size = "6"
            type = "number"
          />
        </div>

      </div>
    );
  }
}

export default GameSettings;
