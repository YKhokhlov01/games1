import { Board } from "./Board";
import React, { useState } from "react";
export const Game = () => {
  const [squares, setSquares] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  let box = squares;
  const [history, setHistory] = useState([{ box }]);
  const [xIsNext, setxIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const current = history[stepNumber];

  function handleClick(idx) {
    let box = squares;
    let number = stepNumber;
    const hist = history.slice(0, number + 1);
    const current = history[history.length - 1];
    let squ = current.box.slice();
    if (calculateWinner(current.box) || squ[idx]) {
      return;
    }
    squ[idx] = xIsNext ? "X" : "O";
    box = squ;
    setSquares(box);
    setHistory(
      hist.concat([
        {
          box,
        },
      ])
    );
    setxIsNext(!xIsNext);
    number = hist.length;
    setStepNumber(number);
    console.log(squ);
    console.log(history);
    console.log(current);
    console.log(stepNumber);
  }

  function jumpTo(i) {
    let xisN = xIsNext;
    let number = stepNumber;
    number = i;
    xisN = i % 2 === 0;
    setStepNumber(number);
    setxIsNext(xisN);
    console.log(number);
    console.log(xisN);
  }

  const moves = history.map((step, move) => {
    const desc = move ? "Перейти к ходу #" + move : "К началу игры";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  const winner = calculateWinner(current.box);
  let status;
  if (winner) {
    status = "Выиграл " + winner;
  } else {
    status = "Следующий ход: " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.box} onClick={(idx) => handleClick(idx)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
