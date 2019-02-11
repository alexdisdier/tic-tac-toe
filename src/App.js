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
    if (row1 === "XXX") {
      return true;
    } else if (row1 === "OOO") {
      return false;
    } else if (row2 === "XXX") {
      return true;
    } else if (row2 === "OOO") {
      return false;
    } else if (row3 === "XXX") {
      return true;
    } else if (row3 === "OOO") {
      return false;
    }
  };

  checkCol = grid => {
    const col1 = grid[0][0] + grid[1][0] + grid[2][0];
    const col2 = grid[0][1] + grid[1][1] + grid[2][1];
    const col3 = grid[0][2] + grid[1][2] + grid[2][2];
    let winner = this.state.winner;
    if (col1 === "XXX" || col2 === "XXX" || col3 === "XXX") {
      winner = "Player One";
    } else if (col1 === "OOO" || col2 === "OOO" || col3 === "OOO") {
      winner = "Player Two";
    }

    this.setState({ winner: winner });
  };

  checkDiagnol = grid => {
    const diagonalRight = grid[0][0] + grid[1][1] + grid[2][2];
    const diagonalLeft = grid[0][2] + grid[1][2] + grid[2][0];
    let winner = this.state.winner;

    if (diagonalRight === "XXX" || diagonalRight === "XXX") {
      winner = "Player One";
    } else if (diagonalRight === "OOO" || diagonalLeft === "OOO") {
      winner = "Player Two";
    }

    this.setState({ winner: winner });
  };

  play = (row, col) => {
    const newGrid = [...this.state.grid];
    const symbolPlayer1 = this.state.symbolPlayer1;
    const symbolPlayer2 = this.state.symbolPlayer2;
    let turn = this.state.turn;
    let turnPlayer1 = this.state.turnPlayer1;
    let turnPlayer2 = this.state.turnPlayer2;

    if (turnPlayer1 + turnPlayer2 === 9) {
      return "Draw";
    }

    if (this.state.winner !== "") {
      return;
    }

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

    this.checkRow(newGrid);
    this.checkCol(newGrid);
    this.checkDiagnol(newGrid);

    this.setState({
      turnPlayer1: turnPlayer1,
      turnPlayer2: turnPlayer2,
      turn: turn,
      grid: newGrid
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
    if (this.state.winner !== "") {
      winner = this.state.winner;
    }
    return (
      <div className="App">
        <Header />
        <div className="game">
          <div className="grid">
            {winner}
            <table>
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
