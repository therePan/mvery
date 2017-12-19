import React from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd-mobile'

@withRouter
class ComplexModal extends Modal {
  constructor(props) {
    super(props)
    const render = this.render
    this._sign = String(Math.random()).replace('0.', 'z')
    this.render = () => {
      this.props.getThat(() => this)
      const label = this.props.label || this._sign
      const { state } = this.props.location
      const out = render.call(this)
      const visible = state && state._complex && state._complex.indexOf(label) >= 0
      if (visible !== this.visible && this.props.onVisible) {
        setTimeout(() => this.props.onVisible(visible))
      }
      this.visible = visible
      return React.cloneElement(out, {
        title: null,
        visible,
      })
    }
  }

  changeVisible = (visible = false, toRoot = false) => {
    const label = this.props.label || this._sign
    const { state } = this.props.location
    const _complex = state && state._complex ? state._complex : []
    if (visible && _complex.indexOf(label) < 0) {
      this.props.history.push(this.props.match.url, { _complex: [..._complex, label] })
    } else
    if (!visible && _complex.indexOf(label) >= 0) {
      this.props.history.go(toRoot ? -state._complex.length : -1)
    }
  }
}

export default ComplexModal
