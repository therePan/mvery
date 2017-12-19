import React from 'react'
import style from './style.less'
import PropTypes from 'prop-types'
import headimg from '@static/headimg@3x.png'

class MessageCard extends React.Component {
  static propTypes = {
    contents: PropTypes.string,
    right: PropTypes.bool,
    info: PropTypes.object,
  }
  render() {
    return (
      <div className={this.props.right ? `${style.content} ${style.right}` : style.content}>
        <div className={style.head}>
          <img src={this.props.right ? this.props.head || headimg :this.props.info.company_logo} alt=""/>
        </div>
        <div className={style.message}>{this.props.contents}</div>
      </div>
    )
  }
}

export default MessageCard