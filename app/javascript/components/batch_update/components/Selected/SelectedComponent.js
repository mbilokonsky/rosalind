import React from 'react'
import styled from 'styled-components'

class SelectedComponent extends React.Component {
  constructor(props) {
    super(props)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleRemove(e) {
    e.preventDefault()
    this.props.onRemove(this.props.name, this.props.stateKey)
  }

  render() {
    const { className, name } = this.props

    return (
      <div className={className}>
        {name}
        <a href="#" className="remove" onClick={this.handleRemove}>
          ✕
        </a>
      </div>
    )
  }
}

/* default styled component */

const StyledSelectedComponent = styled(SelectedComponent)`
  font-weight: bold;
  margin: 0.25em 0;

  a.remove {
    display: inline-block;
    height: 2em;
    width: 2em;
    line-height: 2em;
    text-align: center;
    color: #ddd;
    margin-left: 0.5em;
    border-radius: 1em;
    text-decoration: none;
    &:hover {
      color: #333;
      cursor: pointer;
      background: #eee;
    }
  }
`

export { StyledSelectedComponent as default, SelectedComponent }
