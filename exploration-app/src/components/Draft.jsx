import React from 'react';
import {Editor, EditorState, CompositeDecorator, Modifier, SelectionState, Entity } from 'draft-js';
import styled from 'react-emotion';

const HashTagStyled = styled('span')`
  color: dodgerblue;
  cursor: pointer;
`;


const getEntities = (editorState, entityType = null) => {
    const content = editorState.getCurrentContent();
    const entities = [];
    content.getBlocksAsArray().forEach((block) => {
        let selectedEntity = null;
        block.findEntityRanges(
            (character) => {
                if (character.getEntity() !== null) {
                    const entity = content.getEntity(character.getEntity());
                    if (!entityType || (entityType && entity.getType() === entityType)) {
                        selectedEntity = {
                            entityKey: character.getEntity(),
                            blockKey: block.getKey(),
                            entity: content.getEntity(character.getEntity()),
                        };
                        return true;
                    }
                }
                return false;
            },
            (start, end) => {
                entities.push({...selectedEntity, start, end});
            });
    });
    return entities;
};

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

function findHashtagEntities(contentBlock, callback) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        Entity.get(entityKey).getType() === 'HASHTAG'
      )
    },
    callback
  )
}

function getMatchwithRegex(regex, contentBlock) {
  const text = contentBlock.getText();
  let matchArr, start;
  let startIndexes = [];
  while ((matchArr = regex.exec(text)) !== null) {
    startIndexes.push(matchArr)
  }
  return startIndexes;
}

const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;
function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}


const HashtagSpan = (props) => {
  return (
  <HashTagStyled {...props}>{props.children}</HashTagStyled>
)
}

const decorators = new CompositeDecorator([
  {
    strategy: findHashtagEntities,
    component: HashtagSpan,
  },
]);


class MyEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty(decorators)};
  }

  onChange = (editorState) => {
    if (editorState.getLastChangeType() === 'insert-characters') {
      const content = editorState.getCurrentContent();
      console.log(getEntities(editorState), 'Entities')
      const selection = editorState.getSelection();
      const block = content.getBlockForKey(selection.getAnchorKey());
      const indexes = getMatchwithRegex(HASHTAG_REGEX, block);
      let newEditorState = editorState;
      indexes.forEach((match) => {
         if (block.getEntityAt(match.index) === null) {
           console.log("its not null!!!!", match[0])
           console.log(match, 'match')
           const contentStateWithEntity = newEditorState.getCurrentContent().createEntity('HASHTAG', 'MUTABLE', { tag: match[0] })
           const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
           const selectionState = SelectionState.createEmpty(block.getKey()).merge({
             anchorOffset: match.index,
             focusOffset: match.index + match[0].length,
             focusKey: block.getKey(),
             anchorKey: block.getKey(),
           });
           console.log(match.index,  match.index + match[0].length, 'selection')
           const contentStateWithHashtag = Modifier.applyEntity(
            contentStateWithEntity,
            selectionState,
            entityKey,
          );
          newEditorState = EditorState.push(newEditorState, contentStateWithHashtag, 'apply-entity')
         }
      });
      newEditorState = EditorState.forceSelection(newEditorState, selection)
      console.log(newEditorState, 'new sate')
      this.setState({ editorState: newEditorState }, () => {
        setTimeout(() => this.refs.editor.focus(), 0);
      })
      
    } else {
      this.setState({ editorState });
    }
  }

  handleBeforeInput = (chars, editorState) => {
    console.log('chars' , chars)
    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();
    const end = selection.getEndOffset();

    const block = content.getBlockForKey(selection.getAnchorKey());
    const word = block.getText();
    console.log(word, 'word');
    return 'handled';
  } 

  render() {
    return (
      <div className="editor">
        <Editor 
          editorState={this.state.editorState}
          onChange={this.onChange} 
          ref="editor"
          // handleBeforeInput={this.handleBeforeInput}
          />
      </div>
    );
  }
}


export default MyEditor
