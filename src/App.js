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
      console.log("winner X wins");
    } else if (row1 === "OOO") {
      console.log("winner O wins");
    } else if (row2 === "XXX") {
      console.log("winner X wins");
    } else if (row2 === "OOO") {
      console.log("winner O wins");
    } else if (row3 === "XXX") {
      console.log("winner X wins");
    } else if (row3 === "OOO") {
      console.log("winner O wins");
    }
  };

  checkCol = grid => {
    const col1 = grid[0][0] + grid[0][1] + grid[0][2];
    const col2 = grid[1][0] + grid[1][1] + grid[1][2];
    const col3 = grid[2][0] + grid[2][1] + grid[2][2];
    if (col1 === "XXX") {
      console.log("winner X wins");
    } else if (col1 === "OOO") {
      console.log("winner O wins");
    } else if (col2 === "XXX") {
      console.log("winner X wins");
    } else if (col2 === "OOO") {
      console.log("winner O wins");
    } else if (col3 === "XXX") {
      console.log("winner X wins");
    } else if (col3 === "OOO") {
      console.log("winner O wins");
    }
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
    // this.checkCol(newGrid);

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
    return (
      <div className="App">
        <Header />
        <div className="game">
          <div className="grid">
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
