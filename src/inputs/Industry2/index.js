import React from 'react'
import { connect } from 'react-redux'
import ComplexPicker from '../../components/ComplexPicker'

const seasons = [
  [
    {
      label: '2013',
      value: '2013',
    }, {
      label: '2014',
      value: '2014',
    },
  ],
  [
    {
      label: '春',
      value: '春',
    }, {
      label: '夏',
      value: '夏',
    },
  ],
]

@connect(state => {
  return {
    industry: state.option.opts_industry,
  }
})
class Industry extends React.Component {
  render() {
    // const warp = (
    //   <slot>
    //   </slot>
    // )
    return (
      <ComplexPicker
        {...this.props}
        data={seasons}
        cols={2}
        cascade={false}>
        {this.props.children}
      </ComplexPicker>
    )
  }
}

export default Industry
