import React, { Component } from "react";
import "./assets/css/reset.css";
import "./App.css";
import Header from "./components/Header/Header";

class App extends Component {
  state = {
    grid: [["", "", ""], ["", "", ""], ["", "", ""]],
    row: null,
    col: null,
    turn: 0,
    symbolPlayer1: "X",
    symbolPlayer2: "O",
    turnPlayer1: 0,
    turnPlayer2: 0,
    winner: ""
  };

  checkRow = grid => {
    const row1 = grid[0].join("");
    const row2 = grid[1].join("");
    const row3 = grid[2].join("");

    if (row1 === "XXX" || row2 === "XXX" || row3 === "XXX") {
      return "X";
    } else if (row1 === "OOO" || row2 === "OOO" || row3 === "XXX") {
      return "O";
    }
  };

  checkCol = grid => {
    const col1 = grid[0][0] + grid[1][0] + grid[2][0];
    const col2 = grid[0][1] + grid[1][1] + grid[2][1];
    const col3 = grid[0][2] + grid[1][2] + grid[2][2];

    if (col1 === "XXX" || col2 === "XXX" || col3 === "XXX") {
      return "X";
    } else if (col1 === "OOO" || col2 === "OOO" || col3 === "OOO") {
      return "O";
    }
  };

  checkDiagonal = grid => {
    const diagonalLeft = grid[0][0] + grid[1][1] + grid[2][2];
    const diagonalRight = grid[0][2] + grid[1][1] + grid[2][0];

    if (diagonalRight === "XXX" || diagonalLeft === "XXX") {
      return "X";
    } else if (diagonalRight === "OOO" || diagonalLeft === "OOO") {
      return "O";
    }
  };

  play = (row, col) => {
    const newGrid = [...this.state.grid];
    const symbolPlayer1 = this.state.symbolPlayer1;
    const symbolPlayer2 = this.state.symbolPlayer2;
    let turn = this.state.turn;
    let turnPlayer1 = this.state.turnPlayer1;
    let turnPlayer2 = this.state.turnPlayer2;
    let winner = this.state.winner;

    for (let i = 0; i < newGrid.length; i++) {
      if (i === row) {
        for (let j = 0; j < newGrid[i].length; j++) {
          if (j === col && newGrid[i][j] === "") {
            if (turn === 0) {
              newGrid[i][j] = symbolPlayer1;
              turnPlayer1++;
              turn = 1;
            } else {
              newGrid[i][j] = symbolPlayer2;
              turnPlayer2++;
              turn = 0;
            }
          }
        }
      }
    }

    if (
      this.checkRow(newGrid) === "X" ||
      this.checkCol(newGrid) === "X" ||
      this.checkDiagonal(newGrid) === "X"
    ) {
      winner = "X";
    } else if (
      this.checkRow(newGrid) === "O" ||
      this.checkCol(newGrid) === "O" ||
      this.checkDiagonal(newGrid) === "O"
    ) {
      winner = "O";
    } else if (turnPlayer1 + turnPlayer2 === 9) {
      winner = "Draw";
    }

    this.setState({
      turnPlayer1: turnPlayer1,
      turnPlayer2: turnPlayer2,
      turn: turn,
      grid: newGrid,
      winner: winner
    });
  };

  reset = () => {
    this.setState({
      grid: [["", "", ""], ["", "", ""], ["", "", ""]],
      row: null,
      col: null,
      turn: 0,
      symbolPlayer1: "X",
      symbolPlayer2: "O",
      turnPlayer1: 0,
      turnPlayer2: 0,
      winner: ""
    });
  };

  render() {
    let winner = "";
    if (this.state.winner !== "" && this.state.winner !== "Draw") {
      winner = (
        <span id="result">
          <span>{this.state.winner}</span>WINNER !
        </span>
      );
    } else if (this.state.winner !== "" && this.state.winner === "Draw") {
      winner = (
        <span id="result">
          <span>
            {this.state.winner}{" "}
            <span className="emoji" role="img" aria-label="smily face">
              😀
            </span>
          </span>
        </span>
      );
    }

    return (
      <div className="App">
        <Header />
        <div className="game">
          <div className="grid">
            {winner}
            <table className={winner !== "" ? "game-over" : ""}>
              <tbody>
                {this.state.grid.map((e, row) => (
                  <tr key={row}>
                    {e.map((i, col) => (
                      <td key={col} onClick={() => this.play(row, col)}>
                        {i}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={this.reset}>restart game</button>
      </div>
    );
  }
}

export default App;
