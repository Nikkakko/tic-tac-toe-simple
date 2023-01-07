import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Square from './Square';

type Player = null | 'X' | 'O' | 'BOTH';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>(
    //random player
    Math.round(Math.random()) === 0 ? 'X' : 'O'
  );
  const [winner, setWinner] = useState<Player>(null);

  const setSquareValue = (index: number) => {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return currentPlayer;
      }
      return val;
    });

    setSquares(newData);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setCurrentPlayer(Math.round(Math.random()) === 0 ? 'X' : 'O');
  };

  const calculateWinner = (squares: Player[]) => {
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
  };

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w);
    }

    if (!w && !squares.filter(square => !square).length) {
      setWinner('BOTH');
    }
  });
  return (
    <Container>
      {!winner && <Title>It's '{currentPlayer}' Turn</Title>}
      {winner && winner !== 'BOTH' && <Title>Winner Is '{winner}'</Title>}
      {winner && winner === 'BOTH' && <Title>Congratulations you're both winners</Title>}
      <Grid>
        {Array(9)
          .fill(null)
          .map((_, i) => (
            <Square
              key={i}
              onClick={() => setSquareValue(i)}
              value={squares[i]}
              winner={winner}
            />
          ))}
      </Grid>

      <ResetButton onClick={handleReset}>Reset</ResetButton>
    </Container>
  );
};

const Grid = styled.div`
  display: grid;
  grid-gap: 1px;
  grid-template-columns: repeat(3, 1fr);
`;

const Container = styled.div``;
const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const ResetButton = styled.button`
  margin-top: 1rem;
  padding: 1rem;
  font-size: 1.5rem;
  // color that matches crimson and dodgerblue
  background-color: #0f0230;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  //simple box shadow
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  width: 100%;

  &:hover {
    //scale on hover
    transform: scale(0.98);
    transition: transform 0.2s ease-in-out;
  }
`;

export default Board;
