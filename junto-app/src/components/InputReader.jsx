import React from "react";


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
}

class InputReader extends React.Component {

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
            createSymbol();
            e.preventDefault();
        }
    }

    onKeyUp = (e) => {
        // console.log('wee');

        if (e.key === '@') {
            // document.execCommand('formatBlock', false, )
            getWord()
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
                <button onClick={this.onClick}>Make Bold</button>
            </div>
        )
    }
}

export default InputReader