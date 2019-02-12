import React from "react";
import "./Header.css";

const header = props => {
  return (
    <header>
      <div className="wrapper">
        {/* <p>Select Player One:</p> */}
        <p>Tic Tac Toe</p>
        <span className="turn">
          {props.player === 0 ? "Next Player: X" : "Next Player: O"}
        </span>
        {/* <div className="flex-radio">
          <div>
            <input type="radio" id="zero" name="tic-tac" value="zero" />
            <label htmlFor="zero">O</label>
          </div>

          <div>
            <input type="radio" id="cross" name="tic-tac" value="cross" />
            <label htmlFor="cross">X</label>
          </div>
        </div> */}
      </div>
    </header>
  );
};

export default header;
