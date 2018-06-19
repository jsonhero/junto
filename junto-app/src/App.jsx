import React, { Component } from 'react';
import InputReader from './components/InputReader'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <div className="AppName">Junto</div>
        <InputReader />
      </div>
    );
  }
}

export default App;