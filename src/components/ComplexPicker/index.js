import React from 'react'
import { withRouter } from 'react-router-dom'
import { Picker } from 'antd-mobile'

@withRouter
class ComplexPicker extends Picker {
  constructor(props) {
    super(props)
    const render = this.render
    this._sign = String(Math.random()).replace('0.', 'z')
    this.render = () => {
      const label = this.props.label || this._sign
      const { state } = this.props.location
      const out = render.call(this)
      return React.cloneElement(out, {
        onVisibleChange: this.handleVisibleChange,
        visible: state && state._complex.indexOf(label) >= 0,
      })
    }
  }

  handleVisibleChange = (visible) => {
    if (visible) {
      const label = this.props.label || this._sign
      const { state } = this.props.location
      const _complex = state && state._complex ? state._complex : []
      this.props.history.push(this.props.match.url, { _complex: [..._complex, label] })
    } else {
      this.props.history.goBack()
    }
  }
}

export default ComplexPicker
