import React, { Component } from 'react';
import Draft from './components/Draft';
import styled from 'react-emotion';
import './App.css';

const Container = styled('div')`
  display: flex;
  justify-content: flex-start;
`;

const AppHeader = styled('div')`
  width: 100%;
  height: 60px;
  background-color: #3F6EB5;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.5);
`;

const HeaderContainer = styled('div')`
  align-items: center;
  display: flex;
  width: 360px;
  margin-left: 40px;
`;

const LogoText = styled('div')`
  color: #fff;
  font-size: 22px;
`;

const EditorContainer = styled('div')`
  width: 700px;
  margin: 90px auto;
`;


class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader>
          <HeaderContainer>
            <LogoText>Junto</LogoText>
          </HeaderContainer>
        </AppHeader>
        <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" />
        <EditorContainer>
          <div>Write Notes</div>
          <Draft />
        </EditorContainer>
      </div>
    );
  }
}

export default App;