import React from 'react';
import Counter from './Counter';

class Test extends React.Component {

  constructor() {
    super();
    this.state = { 
      active: false,
    }
  }

  onClick = () => {
    this.setState({ active: !this.state.active })
  }

  render() {
    return (
      <div>
        <div>Things:</div>
        <Counter />
        <button onClick={this.onClick}>Add</button>
        {this.state.active ? React.createElement('Counter') : null}
      </div>
    )
  } 
}

export default Test;
