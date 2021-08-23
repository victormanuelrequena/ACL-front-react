import React, {useState, useEffect} from 'react';
import Parking from './components/Parking';
import Header from './components/Header';
import styled from 'styled-components';

 const AppStyled = styled.div`
   width: 100%;
   height: auto;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   row-gap: 4em;
`;

function App() {

  return (
    <AppStyled>
      <Header />
      <Parking />
    </AppStyled>
  );
}

export default App;
