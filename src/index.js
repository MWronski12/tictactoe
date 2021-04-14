import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.values[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          values: Array(9).fill(null),
        },
      ],
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history;
    const current = history[history.length - 1];
    const values = current.values.slice();

    if (determineWinner(values) || values[i]) {
      return;
    }

    values[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          values: values,
        },
      ]),
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(move) {
    const history = this.state.history.slice(0, move + 1);
    this.setState({
      history: history,
      xIsNext: history.length % 2 === 0 ? false : true,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = determineWinner(current.values);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Current player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board values={current.values} onClick={(i) => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function determineWinner(values) {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < wins.length; i++) {
    const [a, b, c] = wins[i];
    if (values[a] && values[a] === values[b] && values[a] === values[c])
      return values[a];
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));