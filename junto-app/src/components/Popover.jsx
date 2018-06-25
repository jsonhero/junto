import React from 'react';
import ReactDOM from 'react-dom';

class Popover extends React.Component {

  constructor() {
    super()
    this.state = {
      
    }
    this.popEl = React.createRef();
  }

  // componentDidMount() {
  //   this.setPositionStyles();
  // }

 componentDidUpdate(props, state) {
    this.setPositionStyles(); 
  }

  setPositionStyles() {
    const { domNode } = this.props;
    const anchorEl = domNode;
    const popEl = this.popEl;

    if (!this.popEl.current || !domNode)  {
      console.log('shits broke')
      return;
    }

    const anchorRect = anchorEl.getBoundingClientRect();
    const popRect = this.popEl.current.getBoundingClientRect();

    this.popEl.current.style.left = (anchorRect.left - (popRect.width / 2)) + (anchorRect.width / 2) + 'px';
    this.popEl.current.style.top = (anchorRect.top - popRect.height) + 'px';
  }

  render() {
    const { domNode } = this.props;

    if (!domNode) return null;

    const rect = domNode.getBoundingClientRect();

    console.log(rect, "node");

    const style = {
      top: rect.top,
      left: rect.left,
    }
     
    return ReactDOM.createPortal(
      <div>
        <div ref={this.popEl} style={style} className="popover" id="popover">Test Popover</div>
      </div>,
      document.body,
    )

  }
}

export default Popover;
