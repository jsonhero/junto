import React, { Component } from 'react';
import InputReader from './components/InputReader'
import Test from './components/Test';
import logo from './logo.svg';
import NewEditor from './components/NewEditor';
import SlateEditor from './components/Slate';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <link href="https://fonts.googleapis.com/css?family=Fredoka+One" rel="stylesheet" />
      <div className="AppName">Junto</div>
      <SlateEditor />
        {/* <NewEditor /> */}
        {/* <Test /> */}
        {/* <InputReader /> */}
      </div>
    );
  }
}

export default App;