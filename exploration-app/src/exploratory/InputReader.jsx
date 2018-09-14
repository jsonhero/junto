import React from "react";
// import Popover from './Popover';
import Popover from '@material-ui/core/Popover';


function getWord() {
    console.log('getting word');
    var sel, word = "";
    const isStart = true;
    let container = null;
    if (window.getSelection) { 
        sel = window.getSelection();
        let selectedRange = window.getSelection().getRangeAt(0);
        sel.collapseToStart();
        sel.modify("move", "backward", "character");
        sel.modify("extend", "forward", "character");
        let range = sel.getRangeAt(0);
        let span = document.createElement('span')
        span.className = 'highlight';
        range.surroundContents(span);
        // Dumb workaround for webkit browsers
        // https://stackoverflow.com/questions/19300930/move-selection-after-a-dom-element
        const emptyElement = document.createTextNode('\u200B')
        span.parentNode.insertBefore(emptyElement, span.nextSibling)

        let custRange = document.createRange();
        custRange.setStartAfter(emptyElement);
        custRange.collapse(true);
        sel.removeAllRanges();
        sel.addRange(custRange);
    } 
}

function createSymbol() {
    let sel = window.getSelection();
    let selectedRange = window.getSelection().getRangeAt(0);
    let span = document.createElement('span')
    span.className = 'highlight';
    span.innerText = '@';
    selectedRange.insertNode(span);
    // Dumb workaround for webkit browsers
    // https://stackoverflow.com/questions/19300930/move-selection-after-a-dom-element
    const emptyElement = document.createTextNode('\u200B')
    span.parentNode.insertBefore(emptyElement, span.nextSibling)

    let custRange = document.createRange();
    custRange.setStartAfter(emptyElement);
    custRange.collapse(true);
    sel.removeAllRanges();
    sel.addRange(custRange);
    return span;
}

{/* <div>
    <span>@</span> blah blah blah
    <div>blippity blah blah blah</div>
    <div>hippity bippity boppity</div>
</div>

<div><span>@</span><span>testy test testy</span></div>
<div><span>testy test test</span> this part is outside it</div> */}

class InputReader extends React.Component {

    constructor() {
        super();
        this.state = {
            el: null,
        }
    }

    onFocus = (e) => {
    }

    // onChange = (e) => {
    //     console.log(e.currentTarget, 'e')
    // }

    onClick = () => {
        console.log("Showing bold")
        document.execCommand('bold', false, null)
    }

    onKeyDown = (e) => {
        console.log('keeyy prpesss');
        if (e.key === '@') {
            // console.log('wee');
            // document.execCommand('formatBlock', false, )
            // getWord()
            const el = createSymbol();
            console.log(el, "element")
            this.setState({ el })
            e.preventDefault();
        }
    }

    onClose = () => {
        this.setState({ el: null });
    }

    onKeyUp = (e) => {
        // console.log('wee');

        if (e.key === '@') {
            // document.execCommand('formatBlock', false, )
            getWord();
        }
    }

    render() {
        const eventHandlers = {
            onFocus: this.onFocus,
            // onChange: this.onChange,
            // onKeyUp: this.onKeyDown,
            onKeyPress: this.onKeyDown,
            // onKeyDown: this.onKeyDown,
            // onInput: this.onKeyDown,
        }
        return (
            <div>
                <div className="editor" id="editor" contentEditable {...eventHandlers}>
                </div>
                <Popover
                    open={Boolean(this.state.el)}
                    onClose={this.onClose}
                    anchorEl={this.state.el} 
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    disableAutoFocus={true}
                >
                <div className="pop">
                    <input type="text" />
                    <div className="pop-content">Bunch of stuff</div>
                </div>
                </Popover>
                <button onClick={this.onClick}>Make Bold</button>
            </div>
        )
    }
}

export default InputReader