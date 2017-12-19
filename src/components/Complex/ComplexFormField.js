import React from 'react'
import ComplexModal from './ComplexModal'

class ComplexFormField extends React.Component {
  changeVisible = (visible = false, toRoot = false) => {
    this._complex && this._complex().changeVisible(visible, toRoot)
  }

  handleVisible = (visible) => { }

  format() {
    const { value } = this.props
    return (value && value.join) ? value.join(',') : value
  }

  serialize(value) {
    return value
  }

  render() {
    let { children, extra } = this.props
    let isFn = typeof children === 'function'
    children = isFn ? children() : children
    let nativeChild = children.props.children
    const format = this.props.format || this.format
    const warp = [
      nativeChild instanceof React.Component ?
        React.cloneElement(nativeChild, { key: 't' }) :
        nativeChild,
      <ComplexModal key="m"
        {...this.props}
        getThat={(s) => this._complex = s}
        onVisible={this.handleVisible}>
        {this.mainView()}
      </ComplexModal>,
    ]
    const formatExtra = format.call(this, this.serialize(this.props.value))
    return React.cloneElement(children, {
      ...(isFn ? null : {
        extra: (formatExtra && formatExtra !== '') ? formatExtra :
          this.props.hasOwnProperty('extra') ? extra : '请选择',
      }),
      onClick: () => this.changeVisible(true),
    }, warp)
  }
}

export default ComplexFormField
