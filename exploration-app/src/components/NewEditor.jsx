import React from 'react';
import { Editor, EditorState } from 'draft-js';


class NewEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = (editorState) => {
      this.setState({ editorState })
    };
  }

  render() {
    return (
      <div className="editor">
        <Editor
          // onEscape={this.handleEscape}
          // handleBeforeInput={this.handleBeforeInput}
          editorState={this.state.editorState}
          onChange={this.onChange}
          // handleKeyCommand={this.handleKeyCommand}
          // keyBindingFn={this.myKeyBindingFn}
        />
      </div>
    )
  }
}

export default NewEditor;
