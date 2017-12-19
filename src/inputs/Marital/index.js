import React from 'react'
import { connect } from 'react-redux'
import ComplexPicker from '../../components/ComplexPicker'

@connect(state => {
  return {
    options: state.option.opts_marital.filter(item => item.code !== 0),
  }
})
class Marital extends React.Component {
  render() {
    const { options } = this.props
    return (
      <ComplexPicker
        {...this.props}
        data={options
          // .filter(item => item.code !== 0)
          .map(item => ({
            label: item.value,
            value: `${item.code}`,
          }))}
        cols={1}>
        {this.props.children}
      </ComplexPicker>
    )
  }
}

export default Marital
