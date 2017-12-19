import React from 'react'
import style from './style.less'

class TipBoard extends React.Component {
  render() {
    return (
      <div className={style.content}>
        <textarea 
          placeholder="请输入情况说明，方便工作人员核实。（选填）"
          onBlur={(e) => {this.props.onChange(e.target.value)}}
        ></textarea>
      </div>
    )
  }
}

export default TipBoard
