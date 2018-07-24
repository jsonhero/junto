import React from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate'

function CodeNode(props) {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

function BoldMark(props) {
  return <strong>{props.children}</strong>
}

function TagNode({ attributes, children }) {
  return (
    <div className="tag-node" {...attributes}>
      {children}
    </div>
  );
}

const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: 'block',
        type: 'paragraph',
        nodes: [
          {
            object: 'text',
            leaves: [
              {
                text: 'A line of text in a paragraph.',
              },
            ],
          },
        ],
      },
    ],
  },
});

let tagN = 0;
function wrapTag(change) {
  tagN += 1;
  change.wrapBlock({
    type: 'tag',
    data: {
      title: `Tag: ${tagN}`
    },
  })
}

function wrapParagraph(change) {
  change.setBlocks('paragraph');
}

function getTagParent(value) {
  console.log('anchor', value.anchorKey)
  const tag = value.document.getClosest(value.anchorKey, (node) => {
    if (node.object == 'block' && node.type == 'tag') {
      return true;
    }
    return false;
  });

  return tag;
}

class SlateEditor extends React.Component {

  constructor() {
    super();
    this.state = {
      value: initialValue,
    }
  }

  onChange = ({ value }) => {
    // const content = JSON.stringify(value.toJSON())
    // console.log(content);
    this.setState({ value })
  }

  onKeyDown = (event, change) => {
    const { value } = change;
    // Return with no changes if the keypress is not '&'
    // Decide what to do based on the key code...
    console.log(event.key, 'key');

    switch (event.key) {
      // When "B" is pressed, add a "bold" mark to the text.
      case '#': {
        event.preventDefault()
        const tagParent = getTagParent(value);
        if (tagParent) {
          // const child = value.document.getChild(tagParent.key)
          // console.log(tagParent.key, child, 'child');
          change.unwrapBlockByKey(tagParent.key);
          return true;
        }
        change.call(wrapTag)
        return true
      }
    }
  }

  render() {
    return (
      <div className="editor">
        <Editor value={this.state.value} onChange={this.onChange} onKeyDown={this.onKeyDown} renderNode={this.renderNode} renderMark={this.renderMark} />
      </div>
    );
  }

  renderNode = (props) => {
    switch (props.node.type) {
      case 'code':
        return <CodeNode {...props} />
      case 'tag':
        return <TagNode {...props} />
    }
  }

  renderMark = props => {
    switch (props.mark.type) {
      case 'bold':
        return <BoldMark {...props} />
    }
  }
}


export default SlateEditor;
