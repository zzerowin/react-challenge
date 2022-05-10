import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${props => props.theme.bgColor};
`

const H1 = styled.h1`
  color: ${props => props.theme.textColor};
`

interface DummyProps {
  text: string;
  active?: boolean;
}

function Dummy({ text, active = false }: DummyProps) {
  return <h1>{text}</h1>
}

function App() {
  const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
  }
  return (
    <Container>
      <H1>protected</H1>
      <Dummy active text="hello" />
      <button onClick={onClick}>Click me</button>
    </Container>
  );
}

export default App;