import React from 'react';

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      n: 0,
    };
  }

  increaseCount = () => {
    this.setState({
      n: this.state.n + 1,
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.increaseCount}>Increase</button>
        <div>Count: {this.state.n}</div>
      </div>
    )
  }
}

export default Counter;
