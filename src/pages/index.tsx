/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React, { useState } from 'react';
// import { connect } from 'umi';
// import { Button } from 'antd';
import style from './index.less';

const IndexPage: React.FC<{}> = () => {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const calculateWinner = (_squares: any[]) => {
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
      if (_squares[a] && _squares[a] === _squares[b] && _squares[a] === _squares[c]) {
        return _squares[a];
      }
    }
    return null;
  };

  const handleClick = (i: string | number) => {
    const _history = history.slice(0, stepNumber + 1);
    const current = _history[_history.length - 1];
    const _squares = current.squares.slice();

    if (calculateWinner(_squares) || _squares[i]) {
      return;
    }
    _squares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      _history.concat([
        {
          squares: _squares,
        },
      ]),
    );
    setStepNumber(_history.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const Square = (square_props: any) => {
    return (
      <button className="square" onClick={square_props.onClick}>
        {square_props.value}
      </button>
    );
  };

  const Board = (_squares: any[], onClick: (i: any) => void) => {
    return (
      <div className={style.main_body}>
        <div className="board-row">
          <Square value={_squares[0]} onClick={() => onClick(0)} />
          <Square value={_squares[1]} onClick={() => onClick(1)} />
          <Square value={_squares[2]} onClick={() => onClick(2)} />
        </div>
        <div className="board-row">
          <Square value={_squares[3]} onClick={() => onClick(3)} />
          <Square value={_squares[4]} onClick={() => onClick(4)} />
          <Square value={_squares[5]} onClick={() => onClick(5)} />
        </div>
        <div className="board-row">
          <Square value={_squares[6]} onClick={() => onClick(6)} />
          <Square value={_squares[7]} onClick={() => onClick(7)} />
          <Square value={_squares[8]} onClick={() => onClick(8)} />
        </div>
      </div>
    );
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* <Board squares={current.squares} onClick={(i: any) => handleClick(i)} /> */}
        {Board(current.squares, (i: any) => handleClick(i))}
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default IndexPage;
