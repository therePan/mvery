/**
 * Created by huangchao on 2017/11/2.
 */

import React, { Component } from 'react'
import {connect} from 'react-redux'
import style from './style.less'
import Nothing from '../../components/Nothing'
import MessageItem from '../../components/MessageItem'
import { NavBar } from 'antd-mobile'
import {getSyatemMessageInit} from '../../actions/SystemMessage'

@connect(state => {
  return {
    list: state.SystemMessage.list,
  }
})
class SystemMessage extends Component {
  static propTypes = {
  }

  gotMessageDetail = message_id => {
    this.props.history.push(`/person/letter/${message_id}`, {message_id})
  }

  componentWillMount() {
    this.props.dispatch(getSyatemMessageInit())
  }

  render() {
   // console.log(this.props)
    const {list} = this.props
    return (
      <div className={style.SystemMessageWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
        >系统消息</NavBar>
        <div className={style.connent}>
          {
            list.length > 0 ?
              list.map((data, index) => {
                return (
                  <div key={index} onClick={() => this.gotMessageDetail(data.message_id)}>
                    <MessageItem {...data} />
                  </div>
                )
              })
              : <Nothing font="什么都没有~" />
          }
        </div>
      </div>
    )
  }
}

export default SystemMessage

