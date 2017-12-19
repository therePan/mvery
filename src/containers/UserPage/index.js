/**
 * Created by huangchao on 2017/9/29.
 *
 * http://m.veryeast.cn/service 增值服务
 */

import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import LisetItem from '../../components/ListItem'
import Clipboard from 'clipboard'
import style from './style.less'
import Resume from '@static/resume@3x.png'
import company from '@static/attentioncompany@3x.png'
import delivce from '@static/delivce@3x.png'
import collectpost from '@static/collectpost@3x.png'
//import subscription from '@static/subscription@3x.png'
import addserver from '@static/addserver@3x.png'
import appshear from '@static/appshear@3x.png'
import privacyseeting from '@static/privacyseeting@3x.png'
import systemMassage from '@static/systemMassage@3x.png'
import moreseeting from '@static/moreseeting@3x.png'
import userbg from '@static/userbg@3x.png'
import headimg from '@static/headimg@3x.png'
import refresh from '@static/refresh@3x.png'
import { Modal, Toast } from 'antd-mobile'
import {getUserStatus, userRefResume} from '../../actions/userStatus'

@connect(state => {
  return {
    user: state.auth,
    userStatus: state.userStatus,
  }
})
class UserPage extends Component {

  state = {
    refresh: false,
  }

  reFreshResume = () => {
    const _that = this
    this.setState({
      refresh: true,
    })
    this.props.dispatch(userRefResume({
      resume_status: this.props.userStatus.resume_status,
    }))
      .then((data) => {
        if(data) {
          Toast.info('刷新成功', 1)
          _that.setState({
            refresh: false,
          })
        }
      })
  }

  shareApp = () => { // 弹窗分享
    const shareLink = window.location.href
    // const shareImg = this.props.user.portrait_url
    if (navigator.userAgent.indexOf('UCBrowser') > -1 && window.ucbrowser) { // uc  浏览器
      const shareArgs = ['app分享', '快来找找我的工作吧', shareLink, '', '', '\n@' + window.location.host, '']
      return window.ucbrowser.web_share(...shareArgs)
    }
    Modal.alert(
      Clipboard.isSupported() ? '链接已经复制到剪贴板' : '长按分享此链接',
      <p style={{wordWrap: 'break-word'}}>{shareLink}</p>, [
        { text: '确定', style: 'default' },
      ])
  }

  goLogin = () => {
    if(!this.props.userStatus.true_name) {
      this.props.history.push('/user/login')
    }
  }

  ShowRefBtn = () => {
    if(this.props.user.user_id) {
      return <div>
        <div onClick={this.reFreshResume} className={style.btn}>
          <span>刷新简历</span>
          <img className={this.state.refresh ? style.addFrames : null} src={refresh} alt="刷新" />
        </div>
      </div>
    }
  }

  goNextpage = (url) => {
    if(this.props.user.user_id) {
      this.props.history.push(url)
    } else {
      // Toast.info('请先登录', 1)
      // this.props.history.push('/user/login')
      Modal.alert('', '请先登录', [
        { text: '稍后', style: 'default' },
        { text: '登录', onPress: () => this.props.history.push('/user/login', {rediact: this.props.location.pathname}) },
      ])
    }
  }

  componentDidMount() {

    this.clipboard = Clipboard.isSupported() && new Clipboard(this.refs.share, {
        text: () => window.location.href,
    })

    // 获取用户状态
    if(this.props.user){
      this.props.dispatch(getUserStatus()).then(json => {
        if (json.errCode === 2002) {
          Modal.alert('', '请先登录', [
            { text: '稍后', style: 'default' },
            { text: '登录', onPress: () => this.props.history.push('/user/login', {rediact: this.props.location.pathname}) },
          ])
        }
      })
    }
  }

  componentWillUnmount() {
    Clipboard.isSupported() && this.clipboard.destroy()
  }

  render() {
    const userStatus = this.props.userStatus
    const deliver = userStatus.deliver_success_num + userStatus.enterprise_view_num + userStatus.invitation_for_an_interview_num + userStatus.not_appropriate_num
    // console.log(this.props.user)
    return (
      <div className={style.UserPageWrap}>
        <div className={style.top}
              style={{background: `url(${userbg}) center/ cover no-repeat`}}
        >
          <div className={style.hasLogin}>
            <div className={style.left} onClick={this.goLogin}>
              <div className={style.imgBox}
                   style={{backgroundImage: `url(${this.props.userStatus.avatar || headimg})`}}>
              </div>
              <div className={style.username}>
                <span>{this.props.userStatus.true_name || this.props.user.user_name || '登录／注册'}</span>
              </div>
            </div>
            <div className={style.right}>
              {this.ShowRefBtn()}
            </div>
          </div>
        </div>
        <div className={style.resumeBox}>
          <div onClick={() => {this.goNextpage('/resume')}}>
            <LisetItem
              img={Resume}
              titleleft="我的简历"
              righttitle="完整度"
              rightcontant={((this.props.userStatus.resume_complete * 100) || 0) + '%'} />
          </div>
        </div>
        <div className={style.middleBox}>
          <div onClick={() => {this.goNextpage('/person/followedCompanies')}}>
            <LisetItem
              img={company}
              titleleft="关注企业"
              underline="true"
            />
          </div>
          <div onClick={() => {this.goNextpage('/person/applyRecord')}}>
            <LisetItem
              img={delivce}
              titleleft="投递记录"
              underline="true"
              num={deliver}
            />
          </div>
          <div onClick={() => {this.goNextpage('/person/jobFavorites')}}>
            <LisetItem
              img={collectpost}
              titleleft="收藏职位"
              underline="true"
            />
          </div>
          <div onClick={() => {window.location.href = 'http://m.veryeast.cn/service'}}>
            <LisetItem
              img={addserver}
              titleleft="增值服务"
              underline="true"
            />
          </div>
          <div onClick={this.shareApp} ref="share">
            <LisetItem
              img={appshear}
              titleleft="应用分享"
              underline="true"
            />
          </div>
          <div onClick={() => {this.goNextpage('/person/privacy')}}>
            <LisetItem
              img={privacyseeting}
              titleleft="隐私服务"
              underline="false"
            />
          </div>
        </div>
        <div className={style.bottom}>
          <div onClick={() => {this.goNextpage('/person/message')}}>
            <LisetItem
              img={systemMassage}
              titleleft="系统消息"
              num={this.props.userStatus.unread_message_num}
              underline="true"
            />
          </div>
          <div onClick={() => {this.goNextpage('/person/more')}}>
            <LisetItem
              img={moreseeting}
              titleleft="更多设置"
              underline="false"
            />
          </div>
        </div>
      </div>
    )
  }
}

export default UserPage

/*
 <div onClick={() => {this.goNextpage('/person/subscription')}}>
 <LisetItem
 img={subscription}
 titleleft="订阅职位"
 underline="true"
 />
 </div>
*/
