import React, { ReactNode, useEffect, useState } from 'react';
import PlayerSetup, { IVersus } from './PlayerSetup';
import './index.css';

type SquareValue = 'X' | 'O' | null;

const calculateWinner=(squares:SquareValue[]):SquareValue => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          console.log(squares[a]);
          console.log(squares[b]);
          console.log(squares[c]);
        return squares[a];
      }
    }
    return null;
  }

interface ISquareProps{
    onClick(): void;
    value: SquareValue;
}

const Square = (props: ISquareProps)=> {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }

  interface IBoardProps{
      onClick(i: number): void;
      squares: SquareValue[];
  }
  
  const Board = (props:IBoardProps) => {
    const renderSquare= (i:number): ReactNode =>{
      return (
        <Square
          value={props.squares[i]}
          onClick={() => props.onClick(i)}
        />
      );
    }  
      return (
        <div className="board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
      );
  }
  
//

//

  const Game:React.FC= () => {

    const[versus, setNewVersus]= useState<IVersus>({
        player1:'',
        player2:''
    });

    useEffect(() => {console.log(versus)}, [versus])


    const[xIsNext, setXIsNext]= React.useState<boolean>(true);
    const[stepNumber, setStepNumber]= React.useState<number>(0);
    const[history, setHistory]= React.useState<{squares: SquareValue[]}[]>([
        {
          squares: Array(9).fill(null)
        }
      ]);
  
    const handleClick=(i:number):void=> {
      const newHistory = history.slice(0, stepNumber + 1);
      const current = newHistory[newHistory.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = xIsNext ? "X" : "O";
      setHistory(newHistory.concat([
        {
            squares: squares
        }
      ]));
      setStepNumber(newHistory.length);
      setXIsNext(!xIsNext);
    }
  
    const jumpTo = (step:number):void => {
        setStepNumber(step);
        setXIsNext((step % 2) === 0);
    }

      const current = history[stepNumber];
      const winner = calculateWinner(current.squares);
  
      const moves = history.map((step, move) => {
        const desc = move ?
          'Ir a la jugada #' + move :
          'Ir al comienzo de la partida';
        return (
          <li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
          </li>
        );
      });
  
      let status;
      if (winner) {
          if(winner === 'X'){
        status = "Ganador: "+ versus.player1 +" con " +winner;
    }else{
        status = "Ganador: "+ versus.player2 +" con " +winner;
    }
      } else {
        status = "Juega: " + (xIsNext ? "X" : "O");
      }
  
      return (
        <div className="game">
            <PlayerSetup onSubmit={setNewVersus}/>
          <div className="game-board">
            <Board
              squares={current.squares}
              onClick={i => handleClick(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
  }

  export default Game;