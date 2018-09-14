import React from 'react';
import { Editor } from 'slate-react'
import { Value } from 'slate'
import initialValue from './value.json'
import styled from 'react-emotion'

/**
 * A styled emoji inline component.
 *
 * @type {Component}
 */
const noop = e => e.preventDefault()


const schema = {
  inlines: {
    hashtag: {
      isVoid: false,
    },
  },
}


const Emoji = styled('span')`
  outline: ${props => (props.selected ? '2px solid blue' : 'none')};
`

/**
 * Emojis.
 *
 * @type {Array}
 */

const EMOJIS = [
  '😃',
  '😬',
  '😂',
  '😅',
  '😆',
  '😍',
  '😱',
  '👋',
  '👏',
  '👍',
  '🙌',
  '👌',
  '🙏',
  '👻',
  '🍔',
  '🍑',
  '🔑',
]

class SlateEmoji extends React.Component {

  constructor() {
    super();
    this.state = {
      value: Value.fromJSON(initialValue),
    }
  }

  renderNode = props => {
    const { attributes, children, node, isFocused } = props

    console.log(props.node.type, 'type')
    switch (node.type) {
      case 'paragraph': {
        return <p {...attributes}>{children}</p>
      }
      case 'emoji': {
        const code = node.data.get('code')
        return (
          <Emoji
            {...props.attributes}
            selected={isFocused}
            contentEditable={false}
            onDrop={noop}
          >
            {code}
          </Emoji>
        )
      }
    }
  }

    /**
   * On change.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    this.setState({ value })
  }

  /**
   * When clicking a emoji, insert it
   *
   * @param {Event} e
   */

  onClickEmoji = (e, code) => {
    e.preventDefault()
    const { value } = this.state
    const change = value.change()

    change
      .insertInline({
        type: 'emoji',
        data: { code },
      })
      .moveToStartOfNextText()
      .focus()

    this.onChange(change)
  }


  render() {
    return (
      <div className="editor">
          {EMOJIS.map((emoji, i) => (
            <button key={i} onMouseDown={e => this.onClickEmoji(e, emoji)}>
              <span>{emoji}</span>
            </button>
          ))}        <Editor
            placeholder="Write some 😍👋🎉..."
            value={this.state.value}
            schema={this.schema}
            onChange={this.onChange}
            renderNode={this.renderNode}
          />      
      </div>
    )
  }
}
export default SlateEmoji;