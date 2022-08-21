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
  const [stepChange, setStepChange] = useState([0]);
    const[num, setNum] = useState([0])
    const [sort, setSort] = useState(true);   
  const current = history[stepNumber];
 
  function handleClick(idx) {
    // Отобразите позицию для каждого хода в формате (колонка, строка) в списке истории ходов.
    let n = num;
    n=n.concat(idx+1)    
    setNum(n);
    // Основная часть
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
    // Блок вывода хода(Х/0)
    let change = stepChange;
    change = squ[idx]
    setStepChange (
      stepChange.concat(change)
    );
       // Обновление useState 
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
    };
// Функция прыжка по истории
  function jumpTo(i) {
    let xisN = xIsNext;
    let number = stepNumber;
    number = i;
    xisN = i % 2 === 0;
    setStepNumber(number);
    setxIsNext(xisN);      
     }
    //  Вывод Истории игры   
   
 /* const moves = history.map((step, move) => {
    const turn = grid[num[move]]     
    const desc = move ? "Перейти к ходу #" + move + " Позиция по горизонтали: " + turn.x + ";  Позиция по вертикали: " + turn.y + ";  выбор:" + stepChange[move]  : "К началу игры" ;
 
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc} </button>
      </li>
    );
  });*/

  // Сортировка
  function btnSort() {
    let newSort = sort
    newSort=!newSort
    setSort(newSort)    
}
let moves;
if(sort) {
  moves = history.map((step, move) => {
    const turn = grid[num[move]]     
    const desc = move ? "Перейти к ходу #" + move + " Позиция по горизонтали: " + turn.x + ";  Позиция по вертикали: " + turn.y + ";  выбор:" + stepChange[move]  : "К началу игры" ;
     return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc} </button>
      </li>
    );
  });
} else {
   moves =history.map((step, move) => {
    const turn = grid[num[move]]     
    const desc = move ? "Перейти к ходу #" + move + " Позиция по горизонтали: " + turn.x + ";  Позиция по вертикали: " + turn.y + ";  выбор:" + stepChange[move]  : "К началу игры" ;
     return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc} </button>
      </li>
    );
  }).reverse();
}

// Определение победителя
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
      <div>
      <button onClick={() => btnSort()} >Сортировка</button>  
        </div>
    </div>
  );
};

const grid = [
  {x:0, y:0},
  {x:1, y:1},
  {x:1, y:2},
  {x:1, y:3},
  {x:2, y:1},
  {x:2, y:2},
  {x:2, y:3},
  {x:3, y:1},
  {x:3, y:2},
  {x:3, y:3},];

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
