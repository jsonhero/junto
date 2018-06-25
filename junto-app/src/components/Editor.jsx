import React from 'react';
import { Editor, EditorState, CompositeDecorator, convertToRaw, Entity, Modifier, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

const {hasCommandModifier} = KeyBindingUtil;

const Tag = props => {
  return (
    <span className="junto-tag">
        {props.children}
    </span>
  )
};

const OtherTag = props => {
  return (
    <span className="junto-other-tag">
        {props.children}
    </span>
  )
};

function findTags(contentBlock, callback) {
  contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
          entityKey !== null &&
          Entity.get(entityKey).getType() === 'START-TAG'
      );
  }, callback);
}

function findOtherTags(contentBlock, callback) {
  contentBlock.findEntityRanges((character) => {
      const entityKey = character.getEntity();
      return (
          entityKey !== null &&
          Entity.get(entityKey).getType() === 'OTHER-TAG'
      );
  }, callback);
}

const decorator = new CompositeDecorator([{
  strategy: findTags,
  component: Tag,
}, {
  strategy: findOtherTags,
  component: OtherTag,
}]);

/*
- If text is after the INSERT_TAG then any text after it is assumed under that tag.
- Clicking escape or a button stops the tag from selecting
- If another tag is added, the previous tag stops selecting
- 
*/

class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    const editor = EditorState.createEmpty();
    const myState = EditorState.set(editor, { decorator: decorator })
    this.state = {
      editorState: myState,
      tags: {},
      currentlyEditableTag: null,
    };
    this.onChange = (editorState) => {
      console.log(editorState.getSelection(), 'selectionState');

      this.setState({editorState})
    };

    

    this.editor = React.createRef();
  }

  handleKeyCommand = (command) => {
    console.log(command, 'command')
    if (command === 'insert-tag') {
      this.insertStartTag();
      console.log("Saving Tag");
      return 'handled';
    }
    return 'not-handled';
  }

  myKeyBindingFn = (e) => {
    if (e.keyCode === 50) {
      return 'insert-tag';
    }
    return getDefaultKeyBinding(e);
  }

  handleBeforeInput = (chars, editorState) => {
    console.log(chars, 'chars');
    if (this.state.currentlyEditableTag) {
      const tag = this.state.tags[this.state.currentlyEditableTag];
      const currentContent = editorState.getCurrentContent();
      const selection = editorState.getSelection();
      if (!tag.tagEntity) {
        const entityKey = Entity.create('OTHER-TAG', 'MUTABLE', { parent: this.state.currentlyEditableTag });
        const textWithEntity = Modifier.insertText(currentContent, selection, chars, null, entityKey);
        const newEditorState = EditorState.push(editorState, textWithEntity, 'insert-characters');
        this.setState((state) => {
          state.editorState = newEditorState;
          state.tags[this.state.currentlyEditableTag].tagEntity = entityKey;
          return state;
        });
        return 'handled';
      } else {
        const textWithEntity = Modifier.insertText(currentContent, selection, chars, null, tag.tagEntity);
        const newEditorState = EditorState.push(editorState, textWithEntity, 'insert-characters');
        this.setState({ editorState: newEditorState });
        return 'handled';
      }
    }

    return 'not-handled';
  }


  insertStartTag() {
    const editorState = this.state.editorState;
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const entityKey = Entity.create('START-TAG', 'IMMUTABLE', { meta: 'blah' });
    const textWithEntity = Modifier.insertText(currentContent, selection, '@', null, entityKey);

    const newEditorState = EditorState.push(editorState, textWithEntity, 'insert-characters');
    // const newContent = newEditorState.getCurrentContent();
    // const newSelection = newEditorState.getSelection();
    // const myEntityKey = Entity.create('OTHER-TAG', 'MUTABLE', { meta: 'blah' });
    // const myTextWithEntity = Modifier.insertText(newContent, newSelection, 'blah', null, myEntityKey);
    // const newestEditorState = EditorState.push(newEditorState, myTextWithEntity, 'insert-characters');

    this.setState((state) => {
      state.editorState = newEditorState;
      state.tags = Object.assign({}, state.tags, {
        [entityKey]: {
          tagEntity: null,
        },
      })
      state.currentlyEditableTag = entityKey;
      return state;
    }, () => {
        this.focus();
        console.log(this.state, 'state');
    });
  }


  focus() {
    this.editor.current.focus();
  }

  onTest = () => {
    // const content = this.state.editorState.getCurrentContent();
    // console.log(convertToRaw(content))
    const myEntity = this.state.editorState.getCurrentContent().getEntity(this.state.tags[this.state.currentlyEditableTag].tagEntity);
    console.log(myEntity, 'eneity')

  }

  render() {
    return (
      <div className="editor">
      <button onClick={this.onTest}>Test</button>
        <Editor
          ref={this.editor}
          handleBeforeInput={this.handleBeforeInput}
          placeholder="Start typing..."
          editorState={this.state.editorState}
          onChange={this.onChange}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.myKeyBindingFn}
        />
      </div>
    );
  }
}

export default MyEditor;
