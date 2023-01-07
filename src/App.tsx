import Board from './components/Board';
import styled from 'styled-components';

const App = () => {
  return (
    <Container>
      <Board />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default App;
