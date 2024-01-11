/* eslint-disable react/prop-types */
import { useState } from "react";

function Square({ value, handleClicked }) {
  return (
    <button
      onClick={handleClicked}
      className="bg-white border border-gray-400 h-12 w-12 m-1 text-xl"
    >
      {value}
    </button>
  );
}

function Board({ square, isNext, onplay }) {
  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = `winner : ${winner}`;
  } else {
    status = "Next Player is:" + (isNext ? " X" : " O");
  }

  const handleClicked = (i) => {
    if (square[i] || winner) {
      return;
    }
    const nextSqure = square.slice();

    if (isNext) {
      nextSqure[i] = "X";
    } else {
      nextSqure[i] = "O";
    }
    onplay(nextSqure);
  };
  return (
    <>
      <div>
        <h1>{status}</h1>
      </div>
      <div className="flex">
        <Square value={square[0]} handleClicked={() => handleClicked(0)} />
        <Square value={square[1]} handleClicked={() => handleClicked(1)} />
        <Square value={square[2]} handleClicked={() => handleClicked(2)} />
      </div>{" "}
      <div className="flex">
        <Square value={square[3]} handleClicked={() => handleClicked(3)} />
        <Square value={square[4]} handleClicked={() => handleClicked(4)} />
        <Square value={square[5]} handleClicked={() => handleClicked(5)} />
      </div>{" "}
      <div className="flex">
        <Square value={square[6]} handleClicked={() => handleClicked(6)} />
        <Square value={square[7]} handleClicked={() => handleClicked(7)} />
        <Square value={square[8]} handleClicked={() => handleClicked(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [isNext, setIsnext] = useState(true);
  const [currentMove, SetcurrentMove] = useState(0);
  const currentSquare = history[currentMove];

  const handlePlay = (nextSquare) => {
    setIsnext(!isNext);
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    SetcurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (i) => {
    SetcurrentMove(i);
    setIsnext(i % 2 === 0);
  };

  const moves = history.map((squares, index) => {
    let description;
    if (index > 0) {
      description = `Go to the move $${index}`;
    } else {
      description = "start game";
    }
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="pt-20 flex gap-5 ps-10">
      <div>
        <Board isNext={isNext} square={currentSquare} onplay={handlePlay} />
      </div>
      <div>
        <ul>{moves}</ul>
      </div>
    </div>
  );
}

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
