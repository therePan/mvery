import React from 'react'
import { connect } from 'react-redux'
import { Checkbox, Flex } from 'antd-mobile'
import style from './style.less'

@connect(state => {
  return {
    options: state.option.opts_gender,
    optIndex: state.option.opts_gender_index,
  }
})
class IdType extends React.Component {
  render() {
    const { options, value, children } = this.props
    console.log(this.props)
    return React.cloneElement(children, {
      extra: (
        <Flex direction="row-reverse">
          {options.map(item => (
            <Checkbox
              key={item.code}
              className={style.radio}
              checked={item.code === parseInt(value, 10)}
              onChange={e => this.props.onChange(item.code)}
            >
              {item.value}
            </Checkbox>
          ))}
        </Flex>
      ),
    })
  }
}

export default IdType
