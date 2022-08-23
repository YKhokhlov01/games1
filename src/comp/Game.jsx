import { Board } from "./Board";
import { ButtonSort } from "./ButtonSort";
import { Winner } from "./Winner";
import React, { useState } from "react";
export const Game = () => {
  let [squares, setSquares] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]); // Основной массив значений кнопок
  const [history, setHistory] = useState([{ squares }]); // Массив Истории
  let [xIsNext, setxIsNext] = useState(true); //boolean для определения X/O
  let [stepNumber, setStepNumber] = useState(0); //Номер Хода
  let [stepChange, setStepChange] = useState([0]); // Массив Ходов в виде Х/О  для вывода в кнопках-шагах
  let [num, setNum] = useState([0]); // Массив ходов в виде idx-1 кнопки
  const current = history[stepNumber];
  const [sort, setSort] = useState(true);  //Переключатель Сортировки 
  // Выделение желтым последнего хода/ исторического хода
  const [activeButton, setActiveButton] = useState(10) //Активная кнопка в виде массива
  //Функция нажатия игровой кнопки
  function handleClick(idx) {
    // Отобразите позицию для каждого хода в формате (колонка, строка) в списке истории ходов.
    num = num.concat(idx + 1);
    setNum(num);
    // Основная часть
    const hist = history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    let squ = current.squares.slice();
    if (winner || squ[idx]) {
      return;
    }
    setActiveButton(idx) // Выделение желтым последнего хода/ исторического хода
    squ[idx] = xIsNext ? "X" : "O";
    squares = squ;
    // Блок вывода хода(Х/0)
    setStepChange(stepChange.concat(squ[idx]));
    // Обновление useState
    setSquares(squares);
    setHistory(
      hist.concat([
        {
          squares,
        },
      ])
    );
    setxIsNext(!xIsNext);
    stepNumber = hist.length;
    setStepNumber(stepNumber);
  }
  // Функция прыжка по истории
  function jumpTo(i) {       
    stepNumber = i;    
    xIsNext = i % 2 === 0;
    setStepNumber(stepNumber);
    setxIsNext(xIsNext); 
  }
  //Вывод
  let moves;
  if (sort) {
    moves = history.map((step, move) => {
      const turn = grid[num[move]];
      const desc = move
        ? "Перейти к ходу #" +
          move +
          " Позиция по горизонтали: " +
          turn.x +
          ";  Позиция по вертикали: " +
          turn.y +
          ";  выбор:" +
          stepChange[move]
        : "К началу игры";
      return (
        <li key={move}>
          <button className="btnStep" onClick={() => {jumpTo(move);setActiveButton(num[move]-1)}}>{desc} </button>
        </li>
      );
    });
  } else {
    moves = history
      .map((step, move) => {
        const turn = grid[num[move]];
        const desc = move
          ? "Перейти к ходу #" +
            move +
            " Позиция по горизонтали: " +
            turn.x +
            ";  Позиция по вертикали: " +
            turn.y +
            ";  выбор:" +
            stepChange[move]
          : "К началу игры";
        return (
          <li key={move}>
            <button className="btnStep" onClick={() => {jumpTo(move);setActiveButton(num[move]-1)}}>{desc} </button>
          </li>
        );
      })
      .reverse();
  }
  // Определение победителя компонент Winner -поднятие состояния
  const winMass = calculateWinner(current.squares) 
    const win =winMass[1]
    const winner = winMass[0]
 // 
  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} win={win} activeButton={activeButton} onClick={(idx) => handleClick(idx)} />
      </div>
      <div className="game-info">
        <div>
          <div className="status">         
          <Winner squares={squares} winner={winner} xIsNext={xIsNext} />
          </div>
          <h3>           
            <ButtonSort onClickSort={() => setSort(!sort)} />
          </h3>
        </div>
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
      return [squares[a],[a,b,c]]
    }
  }
  return [null,[null,null,null]];
}

const grid = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
  { x: 1, y: 2 },
  { x: 1, y: 3 },
  { x: 2, y: 1 },
  { x: 2, y: 2 },
  { x: 2, y: 3 },
  { x: 3, y: 1 },
  { x: 3, y: 2 },
  { x: 3, y: 3 },
];
