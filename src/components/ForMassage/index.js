/**
 * Created by huangchao on 2017/9/26.
 */
// 用于投递记录中的企业来信 不合适or面试邀约
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import angleDown from '@static/angleDownGray@3x.png'
import style from './style.less'
// import angleUp from '@static/angleUp@3x.png'

class ListItem extends Component {
  state = {
    init: true,
  }
  static propTypes = {
    company: PropTypes.string,
    data: PropTypes.string,
    content: PropTypes.string,
  }
  more = () => {
    this.setState({
      init: !this.state.init,
    })
  }

  replacleHtml = (d='') => {
    return d.replace(/font-size/g, 'font-sizes')
  }

  render() {
    let {sender, subject, date, content} = this.props
    return (
      <div className={style.ForMassageWrap}>
        <div className={style.title}>
          {subject}
        </div>
        <div className={style.container}>
          <div className={`${style.conntent} ${this.state.init ? null : style.more}`}
               dangerouslySetInnerHTML={{__html:this.replacleHtml(content)}}
          />
          <div onClick={this.more} className={style.btn}>
            <img className={this.state.init ? style.up : style.down} src={angleDown} alt="img" />
            <span>{this.state.init ? '展开' : '收起'}</span>
          </div>
        </div>
        <div className={style.comapnyNmae}>
          {sender}
        </div>
        <div className={style.data}>
          {date}
        </div>
      </div>
    )
  }
}

export default ListItem
