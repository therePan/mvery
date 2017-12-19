/**
 * Created by huangchao on 2017/9/27.
 */
import React, { Component } from 'react'
import LisetItem from '../../components/ListItem'
import {connect} from 'react-redux'
import { NavBar, Toast } from 'antd-mobile'
import style from './style.less'
import feedback from '@static/feedback@3x.png'
import opintion from '@static/opintion@3x.png'
import phoneNumber from '@static/pjoneNumber@3x.png'
import {feedbackOpinion} from '../../actions/moreSeeting'

const type = [{
  type: 1,
  val: '功能建议',
}, {
  type: 2,
  val: '页面建议',
}, {
  type: 3,
  val: '新需求',
}, {
  type: 4,
  val: 'BUG',
}, {
  type: 5,
  val: '其他',
}]

@connect(state => {
  return {
    auth: state.auth,
  }
})
class OPintion extends Component {
  state ={
    type: '',
  }
  selItem = type => {
    this.setState({
      type: type,
    })
  }

  submitFeedback = () => {
    const content = this.refs.content.value
    const contact = this.refs.contact.value
    const _that = this
    if(!this.state.type) return Toast.info('请选择反馈类型', 1)
    if(!content) return Toast.info('请输入反馈意见', 1)
    if(!contact) return Toast.info('请输入联系方式', 1)
    this.props.dispatch(feedbackOpinion({
      content,
      contact,
      questiontype: this.state.type,
    })).then(() => {
      Toast.success('感谢您的反馈', 1)
      setTimeout(() => {
        _that.props.history.go(-1)
      }, 1200)
    })
  }

  render() {
    const {phone, email} = this.props.auth
    return (
      <div className={style.OPintionWrap}>
        <NavBar
          mode="dark"
          onLeftClick={() => {this.props.history.go(-1)}}
          rightContent={[
            <span key="0" onClick={this.submitFeedback}>提交</span>,
          ]}
        >意见反馈</NavBar>
        <div className={style.feedtype}>
          <LisetItem
            img={feedback}
            titleleft="反馈类型"
            rightangle="false"
            underline="true" />
          <div className={style.feedItem}>
            <div className={style.itemBox}>
              {type.map((d, i) => (
                <div
                  onClick={() => this.selItem(d.type)}
                  key={d.type}
                  className={`${style.item} ${this.state.type === d.type ? style.selet : null}`}>
                  {d.val}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={style.connent}>
          <LisetItem
            img={opintion}
            titleleft="反馈意见"
            rightangle="false"
            underline="true" />
          <textarea ref="content" className={style.feedcontent} placeholder="你的意见将帮助我们更快成长。" />
        </div>
        <div className={style.number}>
          <LisetItem
            img={phoneNumber}
            titleleft="你的联系方式"
            rightangle="false"
            underline="true" />
          <input className={style.phone} ref="contact" defaultValue={phone || email ||''} type="number"  placeholder="请输入您的联系方式（手机／QQ）" />
        </div>
      </div>
    )
  }
}

export default OPintion
