import React from 'react';
import styled from 'styled-components';

type SquareProps = {
  onClick: () => void;
  value: string;
  winner: string | null;
};

type styledProps = {
  value?: string;
};

const Square: React.FC<SquareProps> = ({ onClick, value, winner }) => {
  if (!value) return <Button onClick={onClick} disabled={Boolean(winner)}></Button>;

  return (
    <Button disabled value={value}>
      {value}
    </Button>
  );
};

const Button = styled.button<styledProps>`
  width: 100px;
  height: 100px;
  font-size: 5rem;
  color: #e8e5e5;
  border: solid 1px #000;
  background-color: ${({ value }) =>
    (value === 'X' && 'crimson') || (value === 'O' && '#1e90ff')};
`;

const SquareContainer = styled.div`
  /* width: 100px;
  height: 100px;
  font-size: 5rem;
  color: #e8e5e5;
  border: solid 1px #000; */
`;

export default Square;
