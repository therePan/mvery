import React from 'react'

const SimpleItem = (props) => (
  <div {...props}>
    <span>{props.children}</span>
    <slot>{props.extra}</slot>
  </div>
)

export default SimpleItem
